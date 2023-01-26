import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'src/utils/rules'
import { ErrorResponse } from 'src/types/utils.type'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { AppContext } from 'src/contexts/appContext'
import Button from 'src/components/Button'
import { Helmet, HelmetProvider } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password'>
const schemaLogin = schema.pick(['email', 'password'])

function Login() {
  const { setAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authAPI.loginAccount(body)
  })
  const submitForm = (values: FormData) => {
    loginAccountMutation.mutate(values, {
      onSuccess: (data) => {
        console.log(data)
        toast.success(data.data.message)
        setProfile(data.data.data.user)
        setAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  }
  return (
    <HelmetProvider>
      <div className='bg-orange'>
        <Helmet>
          <title>Đăng nhập | Shop</title>
          <meta name='description' content='Đăng nhập tài khoản' />
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
                <div className='text-2xl'>Đăng nhập</div>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  placeholder='Email'
                  className='mt-8'
                  errorMessage={errors.email?.message}
                />
                <Input
                  name='password'
                  register={register}
                  type='password'
                  placeholder='Password'
                  className='mt-3'
                  errorMessage={errors.password?.message}
                />
                <div className='mt-3'>
                  <Button
                    type='submit'
                    className='w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 rounded-lg flex items-center justify-center'
                    isLoading={loginAccountMutation.isLoading}
                    disabled={loginAccountMutation.isLoading}
                  >
                    Đăng nhập
                  </Button>
                </div>
                <div className='mt-5 text-center'>
                  <div className='flex items-center justify-center gap-1'>
                    <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                    <Link to='/register' className='text-red-400'>
                      Đăng ký
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

export default Login
