import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'
import Category from './Category'

const StockList = () => {
  const { productsStore } = useStore()

  useEffect(() => {
    productsStore.init()
  }, [])

  return (
    <div>
      <Category />
    </div>
  )
}

export default observer(StockList)
