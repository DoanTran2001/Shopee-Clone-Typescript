import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authAPI = {
  // API register quy định kiểu trả về là AuthResponse
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body),
  loginAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body),
  logoutAccount: () => http.post('/logout')
}
export default authAPI
