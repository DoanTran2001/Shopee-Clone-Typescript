import React from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface ChildrenProps {
  children?: React.ReactNode
}

function MainLayout({children} : ChildrenProps ) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
