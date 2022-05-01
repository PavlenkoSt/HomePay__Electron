import { useCallback, useEffect, useMemo } from 'react'

import { useStore } from 'renderer/store'
import { IMonthPlan, PlanStatusEnum } from 'renderer/types/IPlan'

const useAutoCreateMonthPlan = () => {
  const { plansStore, historyStore } = useStore()

  const months = useMemo(
    () => [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    []
  )

  const currentDate = useMemo(() => {
    const date = new Date()

    return {
      label: `${months[date.getMonth()]} ${date.getFullYear()}`,
      thisMonthDate: new Date(date.getFullYear(), date.getMonth()),
      nextMonthDate: new Date(date.getFullYear(), date.getMonth() + 1),
    }
  }, [months])

  const checkExistPlanForThisMonth = useCallback(
    (title: string) => {
      if (!plansStore.monthPlans || !plansStore.monthPlans.length) return false

      const exist = plansStore.monthPlans.find((month) => month.title === title)

      return Boolean(exist)
    },
    [plansStore.monthPlans]
  )

  useEffect(() => {
    if (
      plansStore.monthPlansSettings &&
      plansStore.monthPlansSettings.sum &&
      !checkExistPlanForThisMonth(currentDate.label)
    ) {
      const targetTransactionsSum = historyStore.transactions
        .filter(
          (transaction) =>
            +new Date(transaction.date) >= +new Date(currentDate.thisMonthDate) &&
            +new Date(transaction.date) <= +new Date(currentDate.nextMonthDate)
        )
        .reduce((acc, cur) => acc + cur.money, 0)

      const createdPlan: IMonthPlan = {
        id: Date.now(),
        title: currentDate.label,
        date: {
          from: currentDate.thisMonthDate,
          to: currentDate.nextMonthDate,
        },
        goal: plansStore.monthPlansSettings.sum,
        status: PlanStatusEnum.IN_PROGRESS,
        state: targetTransactionsSum,
      }

      plansStore.addPlanMonthDB(createdPlan)
    }
  }, [currentDate, plansStore.monthPlansSettings, checkExistPlanForThisMonth])
}

export default useAutoCreateMonthPlan
