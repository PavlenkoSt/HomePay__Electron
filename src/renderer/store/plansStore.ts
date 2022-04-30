import { action, makeAutoObservable, observable } from 'mobx'

import plansApi from 'renderer/api/plans.api'
import JSONCorrect from 'renderer/helpers/JSONCorrect'
import { IMonthPlan, IPlan } from 'renderer/types/IPlan'

class PlansStore {
  @observable plans: IPlan[] = []
  @observable monthPlans: IMonthPlan[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @action setPlans(plans: IPlan[]) {
    this.plans = plans
  }

  @action setMonthPlans(plans: IMonthPlan[]) {
    this.monthPlans = plans
  }

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

    this.setPlans(plans)
    this.setMonthPlans(monthPlans)
  }
}

export default PlansStore
