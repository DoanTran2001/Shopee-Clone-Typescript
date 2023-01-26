import Footer from "src/components/Footer"
import RegisterHeader from "src/components/RegisterHeader"

interface RegisterProps {
  children?: React.ReactNode
}
function RegisterLayout({ children }: RegisterProps) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}

export default RegisterLayout
