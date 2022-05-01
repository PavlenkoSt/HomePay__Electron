import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useCheckboxState } from 'pretty-checkbox-react'

import { useStore } from 'renderer/store/index'
import ToastService from 'renderer/services/ToastService'

type useSchemaMonthPlanPropsType = {
  setVisible: Dispatch<SetStateAction<boolean>>
}

const useSchemaMonthPlan = ({ setVisible }: useSchemaMonthPlanPropsType) => {
  const { plansStore } = useStore()

  const { state: activeSchema, setState: setActiveSchema, onChange } = useCheckboxState()

  const [benefits, setBenefits] = useState('0')

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const set = useCallback(() => {
    plansStore.setMonthPlansSettingsDB({
      sum: +benefits,
      active: Boolean(activeSchema),
    })

    close()

    ToastService.showSuccess('Схема добавлена')
  }, [benefits, activeSchema])

  useEffect(() => {
    if (plansStore.monthPlansSettings && plansStore.monthPlansSettings.sum) {
      setBenefits(plansStore.monthPlansSettings.sum.toString())
      setActiveSchema(plansStore.monthPlansSettings.active)
    }
  }, [plansStore.monthPlansSettings])

  return {
    close,
    set,
    benefits,
    setBenefits,
    activeSchema,
    setActiveSchema,
    onChange,
  }
}

export default useSchemaMonthPlan
