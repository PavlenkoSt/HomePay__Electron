import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { useCheckboxState } from 'pretty-checkbox-react'

import { useStore } from 'renderer/store/index'
import ToastService from 'renderer/services/ToastService'

type useSchemaMonthPlanPropsType = {
  setVisible: Dispatch<SetStateAction<boolean>>
}

const useSchemaMonthPlan = ({ setVisible }: useSchemaMonthPlanPropsType) => {
  const { plansStore } = useStore()

  const [benefits, setBenefits] = useState('0')

  const {
    state: autoContinueMonthPlan,
    setState: setAutoContinueMonthPlan,
    onChange,
  } = useCheckboxState()

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const set = useCallback(() => {
    plansStore.setMonthPlansSettingsDB({
      autoCreate: !!autoContinueMonthPlan,
      sum: +benefits,
    })

    close()

    ToastService.showSuccess('Схема добавлена')
  }, [autoContinueMonthPlan, benefits])

  // const months = useMemo(
  //   () => [
  //     'Январь',
  //     'Февраль',
  //     'Март',
  //     'Апрель',
  //     'Май',
  //     'Июнь',
  //     'Июль',
  //     'Август',
  //     'Сентябрь',
  //     'Октябрь',
  //     'Ноябрь',
  //     'Декабрь',
  //   ],
  //   []
  // )

  useEffect(() => {
    setAutoContinueMonthPlan(true)
  }, [])

  useEffect(() => {
    if (plansStore.monthPlansSettings) {
      setAutoContinueMonthPlan(plansStore.monthPlansSettings.autoCreate)
      if (plansStore.monthPlansSettings.sum) {
        setBenefits(plansStore.monthPlansSettings.sum.toString())
      }
    }
  }, [plansStore.monthPlansSettings])

  // const currentDate = useMemo(() => {
  //   const date = new Date()

  //   return `${months[date.getMonth()]} ${date.getFullYear()}`
  // }, [months])

  return {
    close,
    set,
    onChange,
    autoContinueMonthPlan,
    setAutoContinueMonthPlan,
    benefits,
    setBenefits,
  }
}

export default useSchemaMonthPlan
