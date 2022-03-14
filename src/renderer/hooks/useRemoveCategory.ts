import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { useRadioState } from 'pretty-checkbox-react'

import { useStore } from 'renderer/store'
import ICategory from 'renderer/types/ICategory'
import ToastService from 'renderer/services/ToastService'

export enum ProductsActionEnum {
  SAVE = 'SAVE',
  REMOVE = 'REMOVE',
  MOVE = 'MOVE',
}

type useRemoveCategoryPropsType = {
  category: ICategory
  setVisible: Dispatch<SetStateAction<boolean>>
}

const useRemoveCategory = ({ setVisible, category }: useRemoveCategoryPropsType) => {
  const {
    state: radioStatus,
    onChange: onChangeRadio,
    setState,
  } = useRadioState({
    state: ProductsActionEnum.REMOVE,
  })

  const close = useCallback(() => {
    setVisible(false)
    setState(ProductsActionEnum.REMOVE)
  }, [])

  const remove = useCallback(() => {
    if (radioStatus === ProductsActionEnum.REMOVE) {
      productsStore.removeCategoryWithAllProducts(category.id)
      ToastService.showSuccess('Категория успешно удалена вместе c товарами')
    }

    if (radioStatus === ProductsActionEnum.SAVE) {
    }

    if (radioStatus === ProductsActionEnum.MOVE) {
      // here can be an error - no selected category
    }

    close()
  }, [radioStatus, category.id])

  const { productsStore } = useStore()

  const otherCategories = useMemo(
    () => [...productsStore.categories].filter((categoryStore) => categoryStore.id !== category.id),
    [productsStore.categories, category.id]
  )

  const options = useMemo(
    () => otherCategories.map((cat) => ({ value: cat.id, label: cat.name })),
    [otherCategories]
  )

  return {
    radioStatus,
    onChangeRadio,
    options,
    close,
    remove,
    otherCategoriesLength: otherCategories.length,
  }
}

export default useRemoveCategory
