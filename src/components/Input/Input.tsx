import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // type: React.HTMLInputTypeAttribute
  errorMessage?: string
  // placeholder?: string
  classNameInput?: string
  classNameError?: string
  // name: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

function Input(props: InputProps) {
  const {
    type,
    name,
    placeholder,
    register,
    className,
    errorMessage,
    rules,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-lg focus:shadow-md',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm'
  } = props
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input type={type} className={classNameInput} placeholder={placeholder} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
