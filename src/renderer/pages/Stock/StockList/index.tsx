import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { useStore } from 'renderer/store'
import AddCategory from './AddCategory'

import Category from './Category'

const StockList = () => {
  const { productsStore } = useStore()

  useEffect(() => {
    productsStore.init()
  }, [])

  return (
    <div>
      <div>
        <h2 className="title">Категории</h2>
        {productsStore.categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
        <AddCategory />
      </div>
    </div>
  )
}

export default observer(StockList)
