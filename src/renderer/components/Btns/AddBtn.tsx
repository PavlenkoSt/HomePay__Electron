import { FC } from 'react'

import styles from './AddBtn.module.scss'

type AddBtnPropsType = {
  action: Function
  title?: string
}

const AddBtn: FC<AddBtnPropsType> = ({ action, title }) => {
  return (
    <button title={title} onClick={() => action()} className={styles.addCategory}>
      +
    </button>
  )
}

export default AddBtn
