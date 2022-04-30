import { IMonthPlan, IPlan } from 'renderer/types/IPlan'

enum PlansApiKeys {
  MONTHS = 'month_plans',
  CUSTOM = 'custom_plans',
}

const plansApi = {
  getMonthPlans: () => {
    return window.electron.store.get(PlansApiKeys.MONTHS)
  },
  setMonthPlans: (plans: IMonthPlan) => {
    window.electron.store.set(PlansApiKeys.MONTHS, plans)
  },
  getPlans: () => {
    return window.electron.store.get(PlansApiKeys.CUSTOM)
  },
  setPlans: (plans: IPlan) => {
    window.electron.store.set(PlansApiKeys.CUSTOM, plans)
  },
}

export default plansApi
