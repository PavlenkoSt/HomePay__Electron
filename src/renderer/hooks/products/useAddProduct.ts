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

  const close = useCallback(() => {
    setName('')
    setNameErr(false)
    setVisible(false)
  }, [])

  const addProduct = useCallback(() => {
    if (!name) {
      setNameErr(true)
    }

    if (initialCount < 0) {
      setCountErr(true)
    }

    if (nameErr || countErr) {
      return ToastService.showError('Заполните все поля корректно')
    }

    console.log('name', name)
    console.log('count', +initialCount)
  }, [name, initialCount, nameErr, countErr])

  const nameSetter = useCallback((name: string) => {
    setName(name)
    if (name) {
      setNameErr(false)
    }
  }, [])

  const countSetter = useCallback((count: string) => {
    if (+count >= 0) {
      setCountErr(false)
    }
    setInitialCount(+count)
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
