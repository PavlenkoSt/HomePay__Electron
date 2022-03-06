import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import styles from './Navbar.module.scss'

const Navbar = () => {
  const links = useMemo(
    () => [
      { id: 0, name: 'Главная', to: '/' },
      { id: 1, name: 'Бюджет', to: '/budget' },
    ],
    []
  )

  const { pathname } = useLocation()

  return (
    <div className={styles.navbar}>
      {links.map((link) => (
        <Link
          key={link.id}
          to={link.to}
          className={`${styles.item} ${pathname === link.to && styles.active}`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default Navbar
