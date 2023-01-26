import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStutusCode.enum'
import UserImage from 'src/assets/images/user.svg'

// Hàm kiểm tra xem có phải lỗi Axios hay k
// Nếu đúng thì cho kiểu của error là AxiosError và có dạng T đc truyền vào
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

// Kiểm tra có phải là lỗi 422 hay không
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
}

// Tính % giá giảm
export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}

// Xóa các kí tự đặc biệt trên bàn phím
export const removeSpecialCharacter = (str: string) =>
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export function generateNameId(name: string, _id: string) {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${_id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i,')
  return arr[arr.length - 1]
}

export const getURLAvatar = (avatarName?: string) => {
  return avatarName ? `https://api-ecom.duthanhduoc.com/images/${avatarName}` : UserImage
}