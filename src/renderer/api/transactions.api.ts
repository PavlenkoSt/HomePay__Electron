import ITransaction from 'renderer/types/ITransaction'

enum TransactionsApiKeys {
  TRANSACTIONS = 'transactions',
}

const transactionsApi = {
  getTransactions: () => {
    return window.electron.store.get(TransactionsApiKeys.TRANSACTIONS)
  },
  setTransactions: (transactions: ITransaction) => {
    window.electron.store.set(TransactionsApiKeys.TRANSACTIONS, transactions)
  },
}

export default transactionsApi
