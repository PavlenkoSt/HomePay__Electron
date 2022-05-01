import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

import { useStore } from 'renderer/store/index'
import ToastService from 'renderer/services/ToastService'

type useSchemaMonthPlanPropsType = {
  setVisible: Dispatch<SetStateAction<boolean>>
}

const useSchemaMonthPlan = ({ setVisible }: useSchemaMonthPlanPropsType) => {
  const { plansStore } = useStore()

  const [benefits, setBenefits] = useState('0')

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const set = useCallback(() => {
    plansStore.setMonthPlansSettingsDB({
      sum: +benefits,
    })

    close()

    ToastService.showSuccess('Схема добавлена')
  }, [benefits])

  useEffect(() => {
    if (plansStore.monthPlansSettings && plansStore.monthPlansSettings.sum) {
      setBenefits(plansStore.monthPlansSettings.sum.toString())
    }
  }, [plansStore.monthPlansSettings])

  return {
    close,
    set,
    benefits,
    setBenefits,
  }
}

export default useSchemaMonthPlan
