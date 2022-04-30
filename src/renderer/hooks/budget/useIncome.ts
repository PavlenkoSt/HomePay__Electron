import { useCallback, useMemo, useState } from 'react'

import ToastService from 'renderer/services/ToastService'
import { useStore } from 'renderer/store'
import { IProductWithCurrentCount } from 'renderer/types/IProduct'
import ITransaction from 'renderer/types/ITransaction'

const useIncome = () => {
  const { productsStore, historyStore } = useStore()

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
    [productsStore.products, selectedProducts]
  )

  const pay = useCallback(() => {
    const transaction: ITransaction = {
      id: Date.now(),
      date: new Date(),
      money: selectedProductsSum,
      productDetais: selectedProducts.map((product) => ({
        productId: product.id,
        count: product.currentCount,
      })),
    }

    historyStore.addTransactionDB(transaction)

    ToastService.showSuccess('Товары проданы')

    setSelectedProducts([])

    productsStore.init()
  }, [selectedProductsSum])

  return { selectedProducts, setSelectedProducts, productsOptions, selectedProductsSum, pay }
}

export default useIncome
