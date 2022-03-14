import { FC } from 'react'
import classNames from 'classnames'

import styles from './TextButton.module.scss'

export enum ButtonTypeEnum {
  DEFAULT = 'DEFAULT',
  PRIMARY = 'PRIMARY',
  DANGER = 'DANGER',
}

type TextButtonPropsType = {
  type?: ButtonTypeEnum
}

const TextButton: FC<TextButtonPropsType> = ({ children, type = ButtonTypeEnum.DEFAULT }) => {
  const typeClass =
    type === ButtonTypeEnum.PRIMARY
      ? styles.primary
      : type === ButtonTypeEnum.DANGER
      ? styles.danger
      : styles.default

  return <button className={classNames(styles.btn, typeClass)}>{children}</button>
}

export default TextButton
