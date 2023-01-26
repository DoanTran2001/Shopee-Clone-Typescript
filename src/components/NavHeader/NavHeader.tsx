import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import { Link } from "react-router-dom"
import authAPI from "src/apis/auth.api"
import { AppContext } from "src/contexts/appContext"
import { path, purchaseStatus } from "src/utils/constants"
import Popover from "../Popover"
import { getURLAvatar } from "src/utils/utils"
import { useTranslation } from "react-i18next"
import { locales } from "src/i18n/i18n"

function NavHeader() {
  const { i18n } = useTranslation()
  const currenLanguage = locales[i18n.language as keyof typeof locales]
  // console.log(currenLanguage);
  
  const { setAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  // console.log(profile);
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authAPI.logoutAccount,
    onSuccess: () => {
      setAuthenticated(false)
      setProfile(null)
      // logout thì sẽ k gọi query này (remove api get purchases)
      queryClient.removeQueries({
        queryKey: ['purchases', { status: purchaseStatus.inCart }]
      })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const handleChangeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className='flex justify-end'>
          <Popover
            // as='b'
            // initialOpen={true}
            className='flex items-center py-1 hover:text-gray-300 cursor-pointer mr-6 z-10'
            renderPopover={
              <div className='bg-white relative shadow-sm border border-gray-200'>
                <div className='flex flex-col py-2 px-3 gap-2'>
                  <button className='py-2 px-3 hover:text-orange' onClick={() => handleChangeLanguage("vi")}>Tiếng Việt</button>
                  <button className='py-2 px-3 hover:text-orange' onClick={() => handleChangeLanguage("en")}>Tiếng Anh</button>
                </div>
              </div>
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1' >{currenLanguage}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>
          {isAuthenticated && (
            <Popover
              className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
              renderPopover={
                <div>
                  <Link
                    to={path.profile}
                    className='block py-2 px-3 hover:bg-slate-300 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to='/'
                    className='block py-2 px-3 hover:bg-slate-300 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    Đơn mua
                  </Link>
                  <div
                    className='block py-2 px-3 hover:bg-slate-300 bg-white hover:text-cyan-500 w-full text-left'
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </div>
                </div>
              }
            >
              <div className='w-6 h-6 mr-2 flex-shrink-0'>
                <img
                  src={getURLAvatar(profile?.avatar)}
                  alt='avatar'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <div className=''>{profile && profile.email}</div>
            </Popover>
          )}

          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to={path.register} className='mx-3 capitalize hover:text-white hover:opacity-70'>
                Đăng ký
              </Link>
              <Link to={path.login} className='mx-3 capitalize hover:text-white hover:opacity-70'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
  )
}

export default NavHeader
