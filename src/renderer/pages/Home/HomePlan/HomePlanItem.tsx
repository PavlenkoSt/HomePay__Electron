import styles from './HomePlanItem.module.scss'

import checkPic from 'renderer/assets/check.svg'
import failPic from 'renderer/assets/fail.svg'
import inProgressPic from 'renderer/assets/inProgress.svg'

const HomePlanItem = () => {
  const progress = 30

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.label}>
          <div className={styles.statusPicContainer}>
            <img className={styles.statusPic} src={inProgressPic} />
          </div>
          <div className={styles.title}>This is the plan</div>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progress} style={{ paddingTop: 2 }}>{`(${progress}%)`}</div>
          <div className={styles.progress}>1900 / 2000 ₴</div>
        </div>
      </div>
      <div className={styles.lineContainer}>
        <div className={styles.line}>
          <div className={styles.lineInner} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

export default HomePlanItem
