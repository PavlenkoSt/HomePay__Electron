import { useMemo, useState } from 'react'

import { useStore } from 'renderer/store'
import { IProductWithCurrentCount } from 'renderer/types/IProduct'

const useIncome = () => {
  const { productsStore } = useStore()

  const [selectedProducts, setSelectedProducts] = useState<IProductWithCurrentCount[]>([])

  const selectedProductsSum = useMemo(
    () => selectedProducts.reduce((acc, cur) => acc + cur.price.wholesale * cur.currentCount, 0),
    [selectedProducts]
  )

  const productsOptions = useMemo(
    () =>
      productsStore.products.map((product) => ({
        value: product.id,
        label: product.name,
        product,
      })),
    [productsStore.categories]
  )

  return { selectedProducts, setSelectedProducts, productsOptions, selectedProductsSum }
}

export default useIncome
