import { Dispatch, FC, SetStateAction } from 'react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import Input from 'renderer/components/Form/Input'
import ModalWrapper from 'renderer/components/ModalWrapper'
import useEditCategory from 'renderer/hooks/categories/useEditCategory'
import ICategory from 'renderer/types/ICategory'

import styles from './EditCategoryModal.module.scss'

type EditCategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  category: ICategory
}

const EditCategoryModal: FC<EditCategoryModalPropsType> = ({ visible, setVisible, category }) => {
  const { name, edit, nameHandler, nameErr, close } = useEditCategory({
    id: category.id,
    categoryName: category.name,
    setVisible,
  })

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
