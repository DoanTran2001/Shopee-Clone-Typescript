import User from "./user.type";
import { SuccessResponse } from "./utils.type";

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>

export type RefreshTokenResponse = SuccessResponse<{ access_token: string}>

// const auth: AuthResponse = {
//   message: 'Trần Đoan',
//   data: {
//     access_token: 'assdd',
//     expires: '11',
//     user: {
//       _id: 'asdas',
//       address: '',
//       createdAt: '',
//       date_of_birth: null,
//       email: '',
//       phone: '',
//       roles: ['User'],
//       updatedAt: ''
//     }
//   }
// }