import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'
import Categories from './Categories'
import Products from './Products'

const StockList = () => {
  const { productsStore } = useStore()

  const [activeCategory, setActiveCategory] = useState()

  useEffect(() => {
    productsStore.init()
  }, [])

  return <div>{!!activeCategory ? <Products /> : <Categories />}</div>
}

export default observer(StockList)
