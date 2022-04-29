import { FC, MouseEventHandler } from 'react'
import classNames from 'classnames'

import styles from './TextButton.module.scss'

export enum ButtonTypeEnum {
  DEFAULT = 'DEFAULT',
  PRIMARY = 'PRIMARY',
  DANGER = 'DANGER',
}

type TextButtonPropsType = {
  type?: ButtonTypeEnum
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  small?: boolean
}

const TextButton: FC<TextButtonPropsType> = ({
  children,
  onClick,
  small,
  type = ButtonTypeEnum.DEFAULT,
}) => {
  const typeClass =
    type === ButtonTypeEnum.PRIMARY
      ? styles.primary
      : type === ButtonTypeEnum.DANGER
      ? styles.danger
      : styles.default

  return (
    <button onClick={onClick} className={classNames(styles.btn, typeClass, small && styles.small)}>
      {children}
    </button>
  )
}

export default TextButton
