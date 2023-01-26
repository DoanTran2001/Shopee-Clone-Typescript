// export interface ResponseApi<Data> {
//   message: string
//   data?: Data
// }

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

// Loại bỏ null | undefined trong type
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

type a = {
  name: string
  age?: number
  address?: string
  class: string
}

type b = NoUndefinedField<a>
type c = a