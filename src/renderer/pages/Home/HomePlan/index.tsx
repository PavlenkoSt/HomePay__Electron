import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'

import useAutoCreateMonthPlan from 'renderer/hooks/plans/useAutoCreateMonthPlan'
import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import AddBtn from 'renderer/components/Btns/AddBtn'
import { useStore } from 'renderer/store'
import SchemaMonthPlanModal from './SchemaMonthPlanModal'
import HomePlanItem from './HomePlanItem'

import styles from './styles.module.scss'

const HomePlan = () => {
  const { plansStore } = useStore()

  useAutoCreateMonthPlan()

  const [monthPlanVisible, setMonthPlanVisible] = useState(false)

  const removePlan = useCallback(() => {}, [])

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h4 className={styles.title}>Ежемесячные финансовые планы</h4>
        <div className={styles.planList}>
          {!!plansStore.monthPlansSettings || plansStore.monthPlans.length ? (
            plansStore.monthPlans.map((plan) => (
              <HomePlanItem
                key={plan.title}
                removePlan={removePlan}
                title={plan.title}
                goal={plan.goal}
                state={plan.state}
                status={plan.status}
                date={plan.date}
              />
            ))
          ) : (
            <div className={styles.message}>Пока не назначено схемы</div>
          )}
          <div className={styles.btns}>
            {!!plansStore.monthPlans.length && plansStore.monthPlans.length > 5 && (
              <div className={styles.btn}>
                <TextButton>Показать ещё</TextButton>
              </div>
            )}
            <TextButton
              small
              onClick={() => setMonthPlanVisible(true)}
              type={
                !plansStore.monthPlansSettings ? ButtonTypeEnum.PRIMARY : ButtonTypeEnum.DEFAULT
              }
            >
              {!plansStore.monthPlansSettings ? 'Назначить схему' : 'Редактировать схему'}
            </TextButton>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <h4 className={styles.title}>Дополнительные финансовые планы</h4>
        <div>
          {plansStore.plans.length ? (
            plansStore.plans.map((plan) => (
              <HomePlanItem
                removePlan={removePlan}
                status={plan.status}
                title={plan.title}
                date={plan.date}
                goal={plan.goal}
                state={plan.state}
              />
            ))
          ) : (
            <div className={styles.message}>Пока не назначено дополнительных планов</div>
          )}
          <div className={styles.btns}>
            {!!plansStore.plans.length && plansStore.plans.length > 5 && (
              <div className={styles.btn}>
                <TextButton>Показать ещё</TextButton>
              </div>
            )}
            <AddBtn title="Добавить план" action={() => {}} />
          </div>
        </div>
        <SchemaMonthPlanModal visible={monthPlanVisible} setVisible={setMonthPlanVisible} />
      </div>
    </div>
  )
}

export default observer(HomePlan)
