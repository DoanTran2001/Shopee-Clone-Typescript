import useRoutesElement from './hooks/useRoutesElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/appContext'


function App() {
  const routeElement = useRoutesElement()
  const { reset } = useContext(AppContext)
  // Lắng nghe event
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return <div className=''>
    {routeElement}
    <ToastContainer />
  </div>
}

export default App
