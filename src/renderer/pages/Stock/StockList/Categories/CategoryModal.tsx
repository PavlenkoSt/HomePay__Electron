import { observer } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction } from 'react'

import Button from 'renderer/components/Btns/Button'
import Input from 'renderer/components/Form/Input'
import ModalWrapper from 'renderer/components/ModalWrapper'
import useCreateCategory from 'renderer/hooks/categories/useCreateCategory'

import styles from './CategoryModal.module.scss'

type CategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const CategoryModal: FC<CategoryModalPropsType> = ({ visible, setVisible }) => {
  const { name, setName, nameErr, setNameErr, create, nameHandler } = useCreateCategory({
    setVisible,
  })

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
