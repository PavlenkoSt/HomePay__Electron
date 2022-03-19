import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import Input from 'renderer/components/Form/Input'
import ModalWrapper from 'renderer/components/ModalWrapper'
import ToastService from 'renderer/services/ToastService'
import ICategory from 'renderer/types/ICategory'

import styles from './EditCategoryModal.module.scss'

type EditCategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  category: ICategory
}

const EditCategoryModal: FC<EditCategoryModalPropsType> = ({ visible, setVisible, category }) => {
  const [name, setName] = useState(category.name)

  const [nameErr, setNameErr] = useState(false)

  const edit = useCallback(() => {
    if (!name) {
      setNameErr(true)
      return ToastService.showError('Ошибка')
    }

    // edit

    setVisible(false)
    setName('')

    ToastService.showSuccess('Категория успешно отредактирована')

    return
  }, [name])

  const nameHandler = useCallback((name: string) => {
    setName(name)
    if (name) {
      setNameErr(false)
    }
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Редактирование категории</h2>
        <div className={styles.body}>
          <Input
            value={name}
            setValue={nameHandler}
            error={nameErr}
            label="Название"
            errorMessage="Введите название"
          />
          <div className={styles.btns}>
            <TextButton type={ButtonTypeEnum.PRIMARY} onClick={close}>
              Отмена
            </TextButton>
            <TextButton onClick={edit}>Редактировать категорию</TextButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default EditCategoryModal
