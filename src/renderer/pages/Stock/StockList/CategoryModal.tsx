import { observer } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'

import Button from 'renderer/components/Btns/Button'
import Input from 'renderer/components/Form/Input'
import ModalWrapper from 'renderer/components/ModalWrapper'
import ToastService from 'renderer/services/ToastService'
import { useStore } from 'renderer/store'

import styles from './styles.module.scss'

type CategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const CategoryModal: FC<CategoryModalPropsType> = ({ visible, setVisible }) => {
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

  return (
    <ModalWrapper
      visible={visible}
      close={() => {
        setNameErr(false)
        setVisible(false)
        setName('')
      }}
    >
      <h2 className="title">Новая категория</h2>
      <div className={styles.form}>
        <Input
          value={name}
          setValue={nameHandler}
          error={nameErr}
          label="Название"
          errorMessage="Введите название"
        />
        <div className={styles.btnContainer}>
          <Button action={create}>Создать</Button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default observer(CategoryModal)
