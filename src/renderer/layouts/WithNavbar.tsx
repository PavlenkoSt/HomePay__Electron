import { FC } from 'react'

import Navbar from 'renderer/components/Navbars/Navbar'

const WithNavbar: FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default WithNavbar
