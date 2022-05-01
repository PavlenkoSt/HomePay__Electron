import { action, makeAutoObservable, observable } from 'mobx'

import plansApi from 'renderer/api/plans.api'
import JSONCorrect from 'renderer/helpers/JSONCorrect'
import { IMonthPlan, IPlan, IPlanSettings } from 'renderer/types/IPlan'

class PlansStore {
  @observable plans: IPlan[] = []
  @observable monthPlans: IMonthPlan[] = []
  @observable autoContinueMonthPlan: boolean = false
  @observable monthPlansSettings: IPlanSettings | null = null

  constructor() {
    makeAutoObservable(this)
  }

  @action setPlans(plans: IPlan[]) {
    this.plans = plans
  }

  @action setMonthPlans(plans: IMonthPlan[]) {
    this.monthPlans = plans
  }

  @action setMonthPlansSettings(plansSettings: IPlanSettings) {
    this.monthPlansSettings = plansSettings
  }

  @action setMonthPlansSettingsDB(plansSettings: IPlanSettings) {
    plansApi.setSettingsMonthPlan(plansSettings)
    this.setMonthPlansSettings(plansSettings)
  }

  @action addPlanMonthDB(planMonth: IMonthPlan) {
    this.saveMonthPlans([planMonth, ...this.monthPlans])
  }

  @action removePlanMonthDB() {}

  @action editPlanMonthDB() {}

  @action addPlanDB() {}

  @action removePlanDB() {}

  // savers, init

  @action savePlans(proxyPlans: IPlan[]) {
    const plans = JSONCorrect(proxyPlans)

    this.setPlans(plans)
    plansApi.setPlans(plans)
  }

  @action saveMonthPlans(proxyPlans: IMonthPlan[]) {
    const plans = JSONCorrect(proxyPlans)

    this.setMonthPlans(plans)
    plansApi.setMonthPlans(plans)
  }

  @action init() {
    const plans = plansApi.getPlans() || []
    const monthPlans = plansApi.getMonthPlans() || []
    const monthPlansSettings = plansApi.getSettingsPlan() || null

    this.setPlans(plans)
    this.setMonthPlans(monthPlans)
    this.setMonthPlansSettings(monthPlansSettings)
  }
}

export default PlansStore
