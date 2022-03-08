import { FC } from 'react'

import styles from './AddBtn.module.scss'

type AddBtnPropsType = {
  action: Function
}

const AddBtn: FC<AddBtnPropsType> = ({ action }) => {
  return (
    <button onClick={() => action()} className={styles.addCategory}>
      +
    </button>
  )
}

export default AddBtn
