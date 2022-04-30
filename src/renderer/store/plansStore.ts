import { action, makeAutoObservable, observable } from 'mobx'
import plansApi from 'renderer/api/plans.api'

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

  @action init() {
    const plans = plansApi.getPlans()
    const monthPlans = plansApi.getMonthPlans()

    this.setPlans(plans)
    this.setMonthPlans(monthPlans)
  }
}

export default PlansStore
