import styles from './CloseBtn.module.scss'

import closePic from 'renderer/assets/close.svg'
import { Dispatch, FC, SetStateAction } from 'react'

type CloseBtnPropsType = {
  setVisible: Dispatch<SetStateAction<boolean>>
}

const CloseBtn: FC<CloseBtnPropsType> = ({ setVisible }) => {
  return (
    <div className={styles.btn} onClick={() => setVisible(false)}>
      <img src={closePic} />
    </div>
  )
}

export default CloseBtn
