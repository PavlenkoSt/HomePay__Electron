import { FC } from 'react'

import Navbar from 'renderer/components/Navbars/Navbar'

const WithNavbar: FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 50 }}>{children}</div>
    </div>
  )
}

export default WithNavbar
