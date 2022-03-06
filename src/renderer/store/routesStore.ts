import { action, makeAutoObservable, observable } from 'mobx'

import { BudgetTabsEnum } from 'renderer/types/routesTypes'

class RoutesStore {
  @observable budgetRoute: BudgetTabsEnum = BudgetTabsEnum.INCOME

  constructor() {
    makeAutoObservable(this)
  }

  @action setBudgetRoute = (route: BudgetTabsEnum) => {
    this.budgetRoute = route
  }
}

export default RoutesStore
