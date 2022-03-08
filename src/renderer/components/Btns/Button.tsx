import { FC } from 'react'

import styles from './Button.module.scss'

type ButtonPropsType = {}

const Button: FC<ButtonPropsType> = ({ children }) => {
  return <button className={styles.btn}>{children}</button>
}

export default Button
