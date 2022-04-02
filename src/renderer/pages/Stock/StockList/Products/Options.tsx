import { FC, MouseEventHandler } from 'react'

import IProduct from 'renderer/types/IProduct'

import styles from './Options.module.scss'

type OptionsPropsType = {
  product: IProduct
  editHandler: MouseEventHandler<HTMLDivElement>
}

const Options: FC<OptionsPropsType> = ({ product, editHandler }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.body} onClick={(e) => e.stopPropagation()}>
        <div onClick={editHandler} className={styles.item}>
          <div className={styles.text}>Редактировать</div>
        </div>
        <div className={styles.item}>
          <div className={styles.text}>Переместить</div>
        </div>
      </div>
    </div>
  )
}

export default Options
