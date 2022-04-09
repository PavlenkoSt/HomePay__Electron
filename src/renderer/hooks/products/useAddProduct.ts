import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import productCalc from 'renderer/helpers/productCalc'
import ToastService from 'renderer/services/ToastService'
import { useStore } from 'renderer/store'
import IProduct from 'renderer/types/IProduct'

type useAddProductPropsType = {
  setVisible: Dispatch<SetStateAction<boolean>>
  initialValues: IProduct | null
  editId: number | null
}

const useAddProduct = ({ setVisible, initialValues, editId }: useAddProductPropsType) => {
  const { productsStore } = useStore()

  const [categoryId, setCategoryId] = useState<number | null>(
    initialValues ? initialValues?.categoryId : null
  )

  const [name, setName] = useState(initialValues ? initialValues.name : '')
  const [nameErr, setNameErr] = useState(false)

  const [initialCount, setInitialCount] = useState(initialValues ? initialValues.count : 0)
  const [countErr, setCountErr] = useState(false)

  const [retailPrice, setRetailPrice] = useState(initialValues ? initialValues.price.retail : 0)
  const [retailPriceErr, setRetailPriceErr] = useState(false)

  const [wholesalePrice, setWholesalePrice] = useState(
    initialValues ? initialValues.price.wholesale : 0
  )
  const [wholesalePriceErr, setWholesalePriceErr] = useState(false)

  const [marginValue, setMarginValue] = useState(
    initialValues ? initialValues.price.margin.value : 0
  )
  const [marginValueErr, setMarginValueErr] = useState(false)

  const [marginPercent, setMarginPercent] = useState(
    initialValues ? initialValues.price.margin.percent : 30
  )
  const [marginPercentErr, setMarginPercentErr] = useState(false)

  useEffect(() => {
    if (productsStore.activeCategoryId !== 'all-products') {
      setCategoryId(productsStore.activeCategoryId)
    }
  }, [productsStore.activeCategoryId])

  useEffect(() => {
    if (initialValues?.count) {
      setInitialCount(initialValues?.count)
    }
  }, [productsStore.products])

  const close = useCallback(() => {
    if (!initialValues) {
      setName('')
      setNameErr(false)
    }
    setVisible(false)
  }, [initialValues])

  const addProduct = useCallback(() => {
    let err = false

    if (!categoryId) {
      return ToastService.showError('Выберите категорию')
    }

    if (!name) {
      setNameErr(true)
      err = true
    }

    if (initialCount < 0 || (initialCount ^ 0) !== initialCount) {
      setCountErr(true)
      err = true
    }

    if (retailPrice < 0) {
      setRetailPriceErr(true)
      err = true
    }

    if (wholesalePrice < 0) {
      setWholesalePriceErr(true)
      err = true
    }

    if (retailPrice < 0) {
      setRetailPriceErr(true)
      err = true
    }

    if (marginPercent < 0) {
      setMarginPercentErr(true)
      err = true
    }

    if (marginValue < 0) {
      setMarginValueErr(true)
      err = true
    }

    if (err) {
      return ToastService.showError('Заполните все поля корректно')
    }

    const product = {
      id: Date.now(),
      name,
      categoryId,
      count: +initialCount,
      price: {
        retail: +retailPrice,
        wholesale: +wholesalePrice,
        margin: {
          value: +marginValue,
          percent: +marginPercent,
        },
      },
    }

    if (initialValues && editId) {
      productsStore.editProductDB(product, editId)
      close()

      ToastService.showSuccess('Товар успешно редактирован')
    } else {
      productsStore.addOneProductDB(product)
      ToastService.showSuccess('Товар успешно добавлен')
    }

    clearFields()

    return
  }, [name, initialCount, categoryId, retailPrice, wholesalePrice, marginPercent, marginValue])

  const clearFields = useCallback(() => {
    setName('')
    setInitialCount(0)
    setMarginValue(0)
    setMarginPercent(0)
    setRetailPrice(0)
    setWholesalePrice(0)
  }, [])

  // setters

  const nameSetter = useCallback((name: string) => {
    setName(name)
    if (name) {
      setNameErr(false)
    }
  }, [])

  const countSetter = useCallback((count: string) => {
    if (+count >= 0 && (initialCount ^ 0) === initialCount) {
      setCountErr(false)
    }

    if (count === '') {
      setInitialCount(0)
    } else {
      setInitialCount(+count)
    }
  }, [])

  const retailPriceSetter = useCallback(
    (price: string) => {
      if (+price >= 0) {
        setRetailPriceErr(false)
      }

      const marginV = productCalc.getMarginValueFromPrices(+price, wholesalePrice)
      const percent = productCalc.getPercentFromPrices(+price, wholesalePrice)

      setMarginPercent(percent || 0)
      setMarginValue(marginV || 0)

      setRetailPrice(+price)
    },
    [wholesalePrice]
  )

  const wholesalePriceSetter = useCallback(
    (price: string) => {
      if (+price >= 0) {
        setWholesalePriceErr(false)
      }

      const marginPercent = productCalc.getPercentFromPrices(retailPrice, +price)
      const marginVal = productCalc.getMarginValueFromPrices(retailPrice, +price)

      setMarginPercent(marginPercent || 0)
      setMarginValue(marginVal || 0)

      setWholesalePrice(+price)
    },
    [retailPrice]
  )

  const marginValueSetter = useCallback(
    (value: string) => {
      if (+value >= 0) {
        setMarginValueErr(false)
      }

      const percent = productCalc.getPercentFromRetailAndMarginValue(retailPrice, +value)
      const wholesale = productCalc.getWholesaleFromRetailAndMarginValue(retailPrice, +value)

      setMarginPercent(percent || 0)
      setWholesalePrice(wholesale || 0)

      setMarginValue(+value)
    },
    [retailPrice]
  )

  const marginPercentSetter = useCallback(
    (percent: string) => {
      if (+percent >= 0) {
        setMarginPercentErr(false)
      }

      const wholesale = productCalc.getMarginFromPercentAndPrice(+percent, retailPrice)
      const marginV = productCalc.getMarginValueFromPrices(retailPrice, wholesale)

      setWholesalePrice(wholesale || 0)
      setMarginValue(marginV || 0)

      setMarginPercent(+percent)
    },
    [retailPrice]
  )

  // ====

  const options = useMemo(
    () =>
      productsStore.categories.map((category) => ({ value: category.id, label: category.name })),
    [productsStore.categories]
  )

  return {
    close,
    addProduct,
    options,
    setCategoryId,
    formData: {
      name,
      count: initialCount,
      retailPrice,
      wholesalePrice,
      marginValue,
      marginPercent,
    },
    formDataSetters: {
      nameSetter,
      countSetter,
      retailPriceSetter,
      wholesalePriceSetter,
      marginValueSetter,
      marginPercentSetter,
    },
    errors: {
      nameErr,
      setNameErr,
      countErr,
      setCountErr,
      retailPriceErr,
      setRetailPriceErr,
      wholesalePriceErr,
      setWholesalePriceErr,
      marginValueErr,
      setMarginValueErr,
      marginPercentErr,
      setMarginPercentErr,
    },
  }
}

export default useAddProduct
