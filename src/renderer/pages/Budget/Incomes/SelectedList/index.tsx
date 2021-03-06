import { Dispatch, FC, SetStateAction, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { IProductWithCurrentCount } from 'renderer/types/IProduct'

import SelectedProduct from './SelectedProduct'

import styles from './styles.module.scss'

type SelectedListPropsType = {
  selectedProducts: IProductWithCurrentCount[]
  setSelectedProducts: Dispatch<SetStateAction<IProductWithCurrentCount[]>>
}

const SelectedList: FC<SelectedListPropsType> = ({ selectedProducts, setSelectedProducts }) => {
  const changeCount = useCallback((id: number, mode: 'increment' | 'decrement') => {
    setSelectedProducts((prevProducts) => {
      const products: IProductWithCurrentCount[] = []

      prevProducts.forEach((prevProduct) => {
        if (prevProduct.id === id) {
          if (mode === 'increment') {
            prevProduct.currentCount = prevProduct.currentCount + 1
          } else {
            prevProduct.currentCount = prevProduct.currentCount - 1
          }
        }

        products.push(prevProduct)
      })

      return products
    })
  }, [])

  const removeItem = useCallback((id: number) => {
    setSelectedProducts((prevProducts) => [...prevProducts.filter((product) => product.id !== id)])
  }, [])

  return (
    <div>
      <h4 className={styles.title}>Выбранные товары</h4>
      <div>
        {selectedProducts.map((product, i) => (
          <SelectedProduct
            key={product.id}
            id={product.id}
            name={product.name}
            number={i + 1}
            count={product.count}
            cost={product.price.wholesale}
            currentCount={product.currentCount}
            changeCount={changeCount}
            removeItem={removeItem}
          />
        ))}
      </div>
    </div>
  )
}

export default observer(SelectedList)
