import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen bg-gray-100 px-8'>
      <nav className='py-3'>
        <img src={"/logo.png"} width={144} height={69} />
      </nav>
      <section className='font-primary px-24'>{children}</section>
    </div>
  )
}

export default Layout
