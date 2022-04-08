import { useEffect, useState } from 'react'

import { useStore } from 'renderer/store'
import IProduct from 'renderer/types/IProduct'

type useSearchProductPropsType = {
  search: string
}

const useSearchProduct = ({ search }: useSearchProductPropsType) => {
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([])

  const { productsStore } = useStore()

  useEffect(() => {
    const products = productsStore.products
      .filter((product) => {
        if (productsStore.activeCategoryId === 'all-products') {
          return product.name.toLowerCase().includes(search.toLowerCase())
        } else {
          return (
            product.categoryId === productsStore.activeCategoryId &&
            product.name.toLowerCase().includes(search.toLowerCase())
          )
        }
      })
      .slice()
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

    setSortedProducts(products)
  }, [productsStore.products, search])

  return { sortedProducts }
}

export default useSearchProduct
