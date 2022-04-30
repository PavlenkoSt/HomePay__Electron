import { IMonthPlan, IPlan } from 'renderer/types/IPlan'

enum PlansApiKeys {
  MONTHS = 'month_plans',
  CUSTOM = 'custom_plans',
  AUTO_CONTINUE_MONTH_PLAN = 'auto_continue_month_plan',
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
  getAutoContinueMonthPlan: () => {
    return window.electron.store.get(PlansApiKeys.AUTO_CONTINUE_MONTH_PLAN)
  },
  setAutoContinueMonthPlan: (status: boolean) => {
    window.electron.store.set(PlansApiKeys.AUTO_CONTINUE_MONTH_PLAN, status)
  },
}

export default plansApi
