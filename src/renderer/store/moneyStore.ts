import { action, makeAutoObservable, observable } from 'mobx'

import moneyApi from 'renderer/api/money.api'

class MoneyStore {
  @observable bill = 0

  constructor() {
    makeAutoObservable(this)
  }

  @action setBill(bill: number) {
    this.bill = bill
  }

  @action income(plus: number) {
    this.bill = this.bill + plus
  }

  @action incomeDB(plus: number) {
    this.init()

    const sum = this.bill + plus

    this.setBill(sum)
    moneyApi.setMoney(sum)
  }

  @action outcome(minus: number) {
    this.bill = this.bill - minus
  }

  @action init() {
    const bill = moneyApi.getMoney()

    this.setBill(bill)
  }
}

export default MoneyStore
