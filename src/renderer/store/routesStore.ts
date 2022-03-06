import { StatisticsTabsEnum } from './../types/routesTypes'
import { action, makeAutoObservable, observable } from 'mobx'

import { BudgetTabsEnum } from 'renderer/types/routesTypes'

class RoutesStore {
  @observable budgetRoute = BudgetTabsEnum.INCOME
  @observable statisticsRoute = StatisticsTabsEnum.JOURNAL

  constructor() {
    makeAutoObservable(this)
  }

  @action setBudgetRoute = (route: BudgetTabsEnum) => {
    this.budgetRoute = route
  }

  @action setStatisticsRoute = (route: StatisticsTabsEnum) => {
    this.statisticsRoute = route
  }
}

export default RoutesStore
