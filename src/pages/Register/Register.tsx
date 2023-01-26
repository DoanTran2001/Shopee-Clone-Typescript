import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { getRules, schema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import authAPI from 'src/apis/auth.api'
import { isAxiosError, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/appContext'
import Button from 'src/components/Button'
import { Helmet, HelmetProvider } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const schemaRegister = schema.pick(['email', 'password', 'confirm_password'])

function Register() {
  const { setAuthenticated, setProfile } = useContext(AppContext)
  const naviagate = useNavigate()
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schemaRegister)
  })
  // const rules = getRules(getValues)
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authAPI.registerAccount(body)
  })
  const submitForm = (values: FormData) => {
    const body = omit(values, ['confirm_password']) // Dùng lodash để loại 'confirm_password'
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        toast.success('Đăng ký tài khoản thành công!')
        setAuthenticated(true)
        setProfile(data.data.data.user)
        naviagate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  }
  return (
    <HelmetProvider>
      <div className='bg-orange'>
        <Helmet>
          <title>Đăng ký | Shop</title>
          <meta name='description' content='Đăng ký tài khoản' />
        </Helmet>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form
                action=''
                className='p-10 rounded bg-white shadow-sm'
                autoComplete='off'
                onSubmit={handleSubmit(submitForm)}
                noValidate
              >
                <div className='text-2xl'>Đăng ký</div>
                <Input
                  name='email'
                  type='email'
                  placeholder='Email'
                  register={register}
                  className='mt-8'
                  // errorMessage={errors.email?.message}
                  // rules={rules.email}
                  errorMessage={errors.email?.message}
                />
                <Input
                  name='password'
                  type='password'
                  placeholder='Password'
                  register={register}
                  className='mt-1'
                  // errorMessage={errors.password?.message}
                  // rules={rules.password}
                  errorMessage={errors.password?.message}
                />
                <Input
                  name='confirm_password'
                  type='password'
                  placeholder='Confirm Password'
                  register={register}
                  className='mt-1'
                  // errorMessage={errors.confirm_password?.message}
                  // rules={rules.confirm_password}
                  errorMessage={errors.confirm_password?.message}
                />
                <div className='mt-3'>
                  <Button
                    className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 rounded-lg'
                    isLoading={registerAccountMutation.isLoading}
                    disabled={registerAccountMutation.isLoading}
                  >
                    Đăng ký
                  </Button>
                </div>
                <div className='mt-5 text-center'>
                  <div className='flex items-center justify-center gap-1'>
                    <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                    <Link to='/login' className='text-red-400'>
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default Register
