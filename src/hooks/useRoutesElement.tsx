import { lazy, Suspense, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from 'src/contexts/appContext'
import CartLayout from 'src/layouts/CartLayout'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import UserLayout from 'src/pages/User/layouts/UserLayout'
// import Cart from 'src/pages/Cart'
// import Login from 'src/pages/Login'
// import NotFound from 'src/pages/NotFound'
// import ProductDetail from 'src/pages/ProductDetail'
// import ProductList from 'src/pages/ProductList'
// import Register from 'src/pages/Register'
// import ChangePassword from 'src/pages/User/pages/ChangePassword'
// import HistoryPurchase from 'src/pages/User/pages/HistoryPurchase'
// import Profile from 'src/pages/User/pages/Profile'
import { path } from 'src/utils/constants'

const Login = lazy(() => import('src/pages/Login'))
const Cart = lazy(() => import('src/pages/Cart'))
const NotFound = lazy(() => import('src/pages/NotFound'))
const ProductDetail = lazy(() => import('src/pages/ProductDetail'))
const ProductList = lazy(() => import('src/pages/ProductList'))
const Register = lazy(() => import('src/pages/Register'))
const ChangePassword = lazy(() => import('src/pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('src/pages/User/pages/HistoryPurchase'))
const Profile = lazy(() => import('src/pages/User/pages/Profile'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRoutesElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense> 
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div>Loading Page...</div>}>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElement
}
