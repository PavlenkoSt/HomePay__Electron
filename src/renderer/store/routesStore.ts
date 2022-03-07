import { action, makeAutoObservable, observable } from 'mobx'

import { BudgetTabsEnum, StatisticsTabsEnum, StockTabsEnum } from 'renderer/types/routesTypes'

class RoutesStore {
  @observable budgetRoute = BudgetTabsEnum.INCOME
  @observable statisticsRoute = StatisticsTabsEnum.JOURNAL
  @observable stockRoute = StockTabsEnum.STOCK_LIST

  constructor() {
    makeAutoObservable(this)
  }

  @action setBudgetRoute = (route: BudgetTabsEnum) => {
    this.budgetRoute = route
  }

  @action setStatisticsRoute = (route: StatisticsTabsEnum) => {
    this.statisticsRoute = route
  }

  @action setStockRoute = (route: StockTabsEnum) => {
    this.stockRoute = route
  }
}

export default RoutesStore
