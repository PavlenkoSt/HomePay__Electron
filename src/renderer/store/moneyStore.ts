import { action, makeAutoObservable, observable } from 'mobx'

class MoneyStore {
  constructor() {
    makeAutoObservable(this)
  }

  @observable bill = 0

  @action setBill(bill: number) {
    this.bill = bill
  }

  @action income(plus: number) {
    this.bill = this.bill + plus
  }

  @action outcome(minus: number) {
    this.bill = this.bill - minus
  }
}

export default new MoneyStore()
