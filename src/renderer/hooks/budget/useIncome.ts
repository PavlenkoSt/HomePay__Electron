import { useMemo, useState } from 'react'

import { useStore } from 'renderer/store'
import IProduct from 'renderer/types/IProduct'

const useIncome = () => {
  const { productsStore } = useStore()

  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])

  const [sum, setSum] = useState(0)
  const [sumError, setSumError] = useState(false)

  const productsOptions = useMemo(
    () =>
      productsStore.products.map((product) => ({
        value: product.id,
        label: product.name,
        product,
      })),
    [productsStore.categories]
  )

  return { selectedProducts, setSelectedProducts, productsOptions }
}

export default useIncome
