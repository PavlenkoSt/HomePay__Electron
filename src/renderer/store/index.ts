import { configure, observable } from 'mobx'
import { createContext, useContext } from 'react'

import MoneyStore from './moneyStore'
import ProductsStore from './productsStore'
import RoutesStore from './routesStore'
import HistoryStore from './historyStore'
import PlansStore from './plansStore'

configure({ enforceActions: 'observed' })

class RootStore {
  @observable routesStore = new RoutesStore()
  @observable productsStore = new ProductsStore()
  @observable moneyStore = new MoneyStore()
  @observable historyStore = new HistoryStore()
  @observable plansStore = new PlansStore()
}

const rootStore = new RootStore()

export const StoreContext = createContext<RootStore>(rootStore)

export const useStore = (): RootStore => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

export default new RootStore()
