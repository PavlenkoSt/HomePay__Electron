import classNames from 'classnames'
import { Dispatch, FC, SetStateAction } from 'react'

import styles from './CloseBtn.module.scss'

import closePic from 'renderer/assets/close.svg'

type CloseBtnPropsType = {
  setVisible: Dispatch<SetStateAction<boolean>>
  small?: boolean
}

const CloseBtn: FC<CloseBtnPropsType> = ({ setVisible, small }) => {
  return (
    <div
      className={classNames(styles.btn, small && styles.btnSmall)}
      onClick={() => setVisible(false)}
    >
      <img src={closePic} />
    </div>
  )
}

export default CloseBtn
