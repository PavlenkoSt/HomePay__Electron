import { FC, useMemo } from 'react'

import CloseBtn from 'renderer/components/Btns/CloseBtn'
import { PlanStatusEnum } from 'renderer/types/IPlan'
import formatDate from 'renderer/utilts/formatDate'

import styles from './HomePlanItem.module.scss'

import checkPic from 'renderer/assets/check.svg'
import failPic from 'renderer/assets/fail.svg'
import inProgressPic from 'renderer/assets/inProgress.svg'

type HomePlanItemPropsType = {
  removePlan: Function
  status: PlanStatusEnum
  title: string
  goal: number
  state: number
  date: {
    from: Date
    to: Date
  }
}

const HomePlanItem: FC<HomePlanItemPropsType> = ({
  removePlan,
  status,
  goal,
  state,
  title,
  date,
}) => {
  const progress = useMemo(() => (state * 100) / goal, [goal, state])

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
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progress}>{`${progress}%`}</div>
          <div className={styles.progress}>
            {state} / {goal} ₴
          </div>
        </div>
      </div>
      <div className={styles.lineContainer}>
        <div className={styles.line}>
          <div className={styles.lineInner} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.date}>от {formatDate.number(new Date(date.from))}</div>
        <div className={styles.date}>до {formatDate.number(new Date(date.to))}</div>
      </div>
    </div>
  )
}

export default HomePlanItem
