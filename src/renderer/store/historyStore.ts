import { action, makeAutoObservable, observable } from 'mobx'

import store from '.'
import historyApi from 'renderer/api/history.api'
import JSONCorrect from 'renderer/helpers/JSONCorrect'
import ITransaction from 'renderer/types/ITransaction'

class HistoryStore {
  @observable transactions: ITransaction[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @action setTransactions(transactions: ITransaction[]) {
    this.transactions = transactions
  }

  @action addTransactionDB(transaction: ITransaction) {
    store.moneyStore.incomeDB(transaction.money)

    transaction.productDetais.forEach((productInfo) => {
      store.productsStore.changeProductCounterDB(
        productInfo.productId,
        productInfo.count,
        'decrement'
      )
    })

    this.saveTransactions([...this.transactions, transaction])
  }

  // savers, init

  @action saveTransactions(transactionsProxy: ITransaction[]) {
    const transactions = JSONCorrect(transactionsProxy)

    this.setTransactions(transactions)
    historyApi.setTransactions(transactions)
  }

  @action init() {
    const transactions = historyApi.getTransactions()

    this.setTransactions(transactions)
  }
}

export default HistoryStore
