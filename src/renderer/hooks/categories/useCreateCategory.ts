import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import ToastService from 'renderer/services/ToastService'

import { useStore } from 'renderer/store'

type useCreateCategoryPropsType = {
  setVisible: Dispatch<SetStateAction<boolean>>
}

const useCreateCategory = ({ setVisible }: useCreateCategoryPropsType) => {
  const [name, setName] = useState('')

  const [nameErr, setNameErr] = useState(false)

  const { productsStore } = useStore()

  const create = useCallback(() => {
    if (!name) {
      setNameErr(true)
      return ToastService.showError('Ошибка')
    }

    productsStore.addCategory({
      id: Date.now(),
      name: name,
      productsCount: 0,
    })

    setVisible(false)
    setName('')

    ToastService.showSuccess('Категория успешно добавлена')

    return
  }, [name])

  const nameHandler = useCallback((name: string) => {
    setName(name)
    if (name) {
      setNameErr(false)
    }
  }, [])

  return { name, setName, nameErr, setNameErr, create, nameHandler }
}

export default useCreateCategory
