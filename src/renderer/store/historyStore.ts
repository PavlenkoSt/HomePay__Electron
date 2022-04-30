import { action, makeAutoObservable, observable } from 'mobx'

import store from '.'
import transactionsApi from 'renderer/api/transactions.api'
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

  @action addTransactionDB(transaction: ITransaction, totalSum: number) {
    store.moneyStore.incomeDB(totalSum)

    this.saveTransactions([...this.transactions, transaction])
  }

  @action saveTransactions(transactionsProxy: ITransaction[]) {
    const transactions = JSONCorrect(transactionsProxy)

    this.setTransactions(transactions)
    transactionsApi.setTransactions(transactions)
  }
}

export default HistoryStore
