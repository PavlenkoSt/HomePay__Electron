import { FC, MouseEventHandler } from 'react'

import styles from './Options.module.scss'

type OptionsPropsType = {
  editHandler: MouseEventHandler<HTMLDivElement>
  moveHandler: MouseEventHandler<HTMLDivElement>
}

const Options: FC<OptionsPropsType> = ({ editHandler, moveHandler }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.body} onClick={(e) => e.stopPropagation()}>
        <div onClick={editHandler} className={styles.item}>
          <div className={styles.text}>Редактировать</div>
        </div>
        <div onClick={moveHandler} className={styles.item}>
          <div className={styles.text}>Переместить</div>
        </div>
      </div>
    </div>
  )
}

export default Options
