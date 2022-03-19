import { useStore } from './../../store/index'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import ToastService from 'renderer/services/ToastService'

type useEditCategoryPropsType = {
  id: number
  categoryName: string
  setVisible: Dispatch<SetStateAction<boolean>>
}

const useEditCategory = ({ categoryName, id, setVisible }: useEditCategoryPropsType) => {
  const [name, setName] = useState(categoryName)

  const [nameErr, setNameErr] = useState(false)

  const { productsStore } = useStore()

  const edit = useCallback(() => {
    if (!name) {
      setNameErr(true)
      return ToastService.showError('Ошибка')
    }

    productsStore.editCategoryName(id, name)

    setVisible(false)
    setName('')

    ToastService.showSuccess('Категория успешно отредактирована')

    return
  }, [name, id])

  const nameHandler = useCallback((name: string) => {
    setName(name)
    if (name) {
      setNameErr(false)
    }
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  return { name, edit, nameHandler, nameErr, close }
}

export default useEditCategory
