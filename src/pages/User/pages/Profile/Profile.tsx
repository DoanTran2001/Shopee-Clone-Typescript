import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/appContext'
import { userSchema, UserSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'
import { saveProfileToLS } from 'src/utils/auth'
import { getURLAvatar, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
// import { config } from 'src/utils/constants'
import InputFile from 'src/components/InputFile'
import Info from '../../components/Info'

export type FormDataProfile = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormDataProfile, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick(['name', 'address', 'date_of_birth', 'phone', 'avatar'])

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const methods = useForm<FormDataProfile>({
    defaultValues: {
      name: '',
      address: '',
      avatar: '',
      phone: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch
  } = methods
  const avatar = watch('avatar')
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('phone', profile.phone)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
  const handleSubmitForm = handleSubmit(async (data) => {
    // console.log(data)
    try {
      // Upload Image
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      // Gọi API update profile
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      saveProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      // console.log(errors)
      // Xử lý lỗi từ server trả về
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  const handleChangeFile = (file?: File) => {
    setFile(file)
  }
  // const handleUpload = () => {
  //   fileInputRef.current?.click()
  // }
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow-md md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <FormProvider {...methods}>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={handleSubmitForm}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-800'>{profile?.email}</div>
            </div>
          </div>
          <Info />
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => {
              return (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )
            }}
          />

          <div className='mt-3 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Button type='submit' className='flex items-center h-9 bg-orange px-5 text-center text-white'>
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                className='w-full h-full object-cover rounded-full'
                src={previewImage || getURLAvatar(avatar)}
                alt=''
              />
            </div>
            <InputFile onChange={handleChangeFile} />
            {/* <input type='file' accept='.jpg,.jpeg,.png' className='hidden' ref={fileInputRef} onChange={onFileChange} onClick={(event) => {
              (event.target as any).value = null // allow input type file select the same file 
            }}/> */}
            {/* <button
              type='button'
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              onClick={handleUpload}
            >
              Chọn ảnh
            </button> */}
            <div className='mt-3 text-gray-400'>
              <div className=''>Dung lượng file tối đa 1MB</div>
              <div className=''>Định dạng: .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
      </FormProvider>
    </div>
  )
}
