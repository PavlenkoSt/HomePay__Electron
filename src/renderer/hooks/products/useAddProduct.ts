import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import ToastService from 'renderer/services/ToastService'

import { useStore } from 'renderer/store'

type useAddProductPropsType = {
  setVisible: Dispatch<SetStateAction<boolean>>
}

const useAddProduct = ({ setVisible }: useAddProductPropsType) => {
  const { productsStore } = useStore()

  const [categoryId, setCategoryId] = useState<number | null>(null)

  const [name, setName] = useState('')
  const [nameErr, setNameErr] = useState(false)

  const [initialCount, setInitialCount] = useState(0)
  const [countErr, setCountErr] = useState(false)

  const [retailPrice, setRetailPrice] = useState()

  const close = useCallback(() => {
    setName('')
    setNameErr(false)
    setVisible(false)
  }, [])

  const addProduct = useCallback(() => {
    let err = false

    if (!name) {
      setNameErr(true)
      err = true
    }

    if (initialCount < 0 || (initialCount ^ 0) !== initialCount) {
      setCountErr(true)
      err = true
    }

    if (err) {
      return ToastService.showError('Заполните все поля корректно')
    }

    console.log('name', name)
    console.log('count', +initialCount)

    const product = {
      name,
      count: initialCount,
      categoryId,
    }
  }, [name, initialCount, nameErr, countErr])

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
      setInitialCount(parseInt(count))
    }
  }, [])

  const options = useMemo(
    () => productsStore.products.map((product) => ({ value: product.id, label: product.name })),
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
    },
    formDataSetters: {
      nameSetter,
      countSetter,
    },
    errors: {
      nameErr,
      setNameErr,
      countErr,
      setCountErr,
    },
  }
}

export default useAddProduct
