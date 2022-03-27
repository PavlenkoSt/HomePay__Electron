import { FC, useCallback } from 'react'

import IProduct from 'renderer/types/IProduct'

import styles from './Options.module.scss'

type OptionsPropsType = {
  product: IProduct
}

const Options: FC<OptionsPropsType> = ({ product }) => {
  const edit = useCallback(() => {
    
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.body} onClick={(e) => e.stopPropagation()}>
        <div className={styles.item}>
          <div onClick={edit} className={styles.text}>
            Редактировать
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.text}>Переместить</div>
        </div>
      </div>
    </div>
  )
}

export default Options
