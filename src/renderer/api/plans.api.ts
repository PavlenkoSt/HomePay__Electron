import { IMonthPlan, IPlan, IPlanSettings } from 'renderer/types/IPlan'

enum PlansApiKeys {
  MONTHS = 'month_plans',
  CUSTOM = 'custom_plans',
  SCHEMA = 'schema_month_plans',
}

const plansApi = {
  getMonthPlans: () => {
    return window.electron.store.get(PlansApiKeys.MONTHS)
  },
  setMonthPlans: (plans: IMonthPlan[]) => {
    window.electron.store.set(PlansApiKeys.MONTHS, plans)
  },
  getPlans: () => {
    return window.electron.store.get(PlansApiKeys.CUSTOM)
  },
  setPlans: (plans: IPlan[]) => {
    window.electron.store.set(PlansApiKeys.CUSTOM, plans)
  },
  getSettingsPlan: () => {
    return window.electron.store.get(PlansApiKeys.SCHEMA)
  },
  setSettingsMonthPlan: (settings: IPlanSettings) => {
    window.electron.store.set(PlansApiKeys.SCHEMA, settings)
  },
}

export default plansApi
