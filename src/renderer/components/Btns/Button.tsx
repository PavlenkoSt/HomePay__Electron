import { FC, MouseEventHandler } from 'react'

import styles from './Button.module.scss'

type ButtonPropsType = {
  action?: MouseEventHandler<HTMLButtonElement>
}

const Button: FC<ButtonPropsType> = ({ children, action }) => {
  return (
    <button onClick={action} className={styles.btn}>
      {children}
    </button>
  )
}

export default Button
