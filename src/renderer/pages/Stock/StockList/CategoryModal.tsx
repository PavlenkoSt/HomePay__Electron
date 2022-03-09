import { Dispatch, FC, SetStateAction, useState } from 'react'
import Button from 'renderer/components/Btns/Button'
import Input from 'renderer/components/Form/Input'

import ModalWrapper from 'renderer/components/ModalWrapper'

import styles from './styles.module.scss'

type CategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const CategoryModal: FC<CategoryModalPropsType> = ({ visible, setVisible }) => {
  const [name, setName] = useState('')
  const [count, setCount] = useState('')

  const [nameErr, setNameErr] = useState(false)

  return (
    <ModalWrapper
      visible={visible}
      close={() => {
        setVisible(false)
        setName('')
        setCount('')
      }}
    >
      <h2 className="title">Новая категория</h2>
      <div className={styles.form}>
        <Input
          value={name}
          setValue={setName}
          label="Название"
          error={nameErr}
          errorMessage="Введите название"
        />
        <Input value={count} setValue={setCount} label="Количество" type="number" />
        <div className={styles.btnContainer}>
          <Button>Создать</Button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CategoryModal