enum MoneyApiKeys {
  BILL = 'bill',
}

const moneyApi = {
  getMoney: () => {
    return window.electron.store.get(MoneyApiKeys.BILL)
  },
  setMoney: (bill: number) => {
    window.electron.store.set(MoneyApiKeys.BILL, bill)
  },
}

export default moneyApi
