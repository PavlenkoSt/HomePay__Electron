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
}

const TextButton: FC<TextButtonPropsType> = ({
  children,
  onClick,
  type = ButtonTypeEnum.DEFAULT,
}) => {
  const typeClass =
    type === ButtonTypeEnum.PRIMARY
      ? styles.primary
      : type === ButtonTypeEnum.DANGER
      ? styles.danger
      : styles.default

  return (
    <button onClick={onClick} className={classNames(styles.btn, typeClass)}>
      {children}
    </button>
  )
}

export default TextButton
