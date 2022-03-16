import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'
import Categories from './Categories'
import Products from './Products'

const StockList = () => {
  const { productsStore } = useStore()

  useEffect(() => {
    productsStore.init()
  }, [])

  return <div>{!!productsStore.activeCategoryId ? <Products /> : <Categories />}</div>
}

export default observer(StockList)
