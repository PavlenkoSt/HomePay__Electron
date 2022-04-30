import ITransaction from 'renderer/types/ITransaction'

enum HistoryApiKeys {
  TRANSACTIONS = 'transactions',
}

const historyApi = {
  getTransactions: () => {
    return window.electron.store.get(HistoryApiKeys.TRANSACTIONS)
  },
  setTransactions: (transactions: ITransaction) => {
    window.electron.store.set(HistoryApiKeys.TRANSACTIONS, transactions)
  },
}

export default historyApi
