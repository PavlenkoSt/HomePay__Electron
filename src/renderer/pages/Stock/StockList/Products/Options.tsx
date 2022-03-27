import styles from './Options.module.scss'

const Options = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.body} onClick={(e) => e.stopPropagation()}>
        <div className={styles.item}>
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
