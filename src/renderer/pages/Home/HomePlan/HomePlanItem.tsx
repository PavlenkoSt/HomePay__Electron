import { FC, useMemo, useState } from 'react'

import { PlanStatusEnum } from 'renderer/types/IPlan'
import formatDate from 'renderer/utilts/formatDate'
import IconBtn from 'renderer/components/Btns/IconBtn'

import styles from './HomePlanItem.module.scss'

import checkPic from 'renderer/assets/check.svg'
import failPic from 'renderer/assets/fail.svg'
import inProgressPic from 'renderer/assets/inProgress.svg'
import editPic from 'renderer/assets/edit.svg'
import EditMonthPlanModal from './EditMonthPlanModal'

type HomePlanItemPropsType = {
  id: number
  status: PlanStatusEnum
  title: string
  goal: number
  state: number
  date: {
    from: Date
    to: Date
  }
}

const HomePlanItem: FC<HomePlanItemPropsType> = ({ id, status, goal, state, title, date }) => {
  const progress = useMemo(() => Math.round((state * 100) / goal), [goal, state])

  const [editModalVisible, setEditModalVisible] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.editContainer}>
        <IconBtn
          btnStyles={{ backgroundColor: '#eea300', borderRadius: 50, border: '1px solid #cc8d02' }}
          icon={editPic}
          action={() => setEditModalVisible(true)}
          small
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
      <EditMonthPlanModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        id={id}
        title={title}
        goal={goal}
      />
    </div>
  )
}

export default HomePlanItem
