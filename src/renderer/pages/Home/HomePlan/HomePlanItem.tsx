import { FC } from 'react'

import CloseBtn from 'renderer/components/Btns/CloseBtn'
import { PlanStatusEnum } from 'renderer/types/IPlan'

import styles from './HomePlanItem.module.scss'

import checkPic from 'renderer/assets/check.svg'
import failPic from 'renderer/assets/fail.svg'
import inProgressPic from 'renderer/assets/inProgress.svg'

type HomePlanItemPropsType = {
  removePlan: Function
  status: PlanStatusEnum
}

const HomePlanItem: FC<HomePlanItemPropsType> = ({ removePlan, status }) => {
  const progress = 30

  // const startDate = new Date()
  // const endDate = new Date()

  return (
    <div className={styles.container}>
      <div className={styles.removeContainer}>
        <CloseBtn
          small
          setVisible={() => {
            removePlan()
          }}
        />
      </div>
      <div className={styles.header}>
        <div className={styles.label}>
          <div className={styles.statusPicContainer}>
            <img
              className={styles.statusPic}
              src={
                status === PlanStatusEnum.DONE
                  ? checkPic
                  : status === PlanStatusEnum.IN_PROGRESS
                  ? inProgressPic
                  : failPic
              }
            />
          </div>
          <div className={styles.title}>This is the plan</div>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progress}>{`${progress}%`}</div>
          <div className={styles.progress}>1900 / 2000 ₴</div>
        </div>
      </div>
      <div className={styles.lineContainer}>
        <div className={styles.line}>
          <div className={styles.lineInner} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.date}>от 20.02.2022</div>
        <div className={styles.date}>до 20.05.2022</div>
      </div>
    </div>
  )
}

export default HomePlanItem
