import classNames from 'classnames'
import { CSSProperties, FC, MouseEventHandler } from 'react'

import styles from './IconBtn.module.scss'

type IconBtnPropsType = {
  small?: boolean
  btnStyles?: CSSProperties
  action: MouseEventHandler<HTMLDivElement>
  icon: string
}

const IconBtn: FC<IconBtnPropsType> = ({ small, action, btnStyles, icon }) => {
  return (
    <div
      className={classNames(styles.btn, small && styles.btnSmall)}
      style={btnStyles}
      onClick={action}
    >
      <img className={styles.pic} src={icon} />
    </div>
  )
}

export default IconBtn
