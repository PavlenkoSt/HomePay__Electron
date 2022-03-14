import { Dispatch, FC, SetStateAction, useCallback } from 'react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'

import styles from './styles.module.scss'

type RemoveCategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  name: string
}

const RemoveCategoryModal: FC<RemoveCategoryModalPropsType> = ({ visible, setVisible, name }) => {
  const close = useCallback(() => setVisible(false), [])

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Удаление категории - {name}</h2>
        <div></div>
        <div className={styles.btnsRemoveModal}>
          <TextButton type={ButtonTypeEnum.PRIMARY} onClick={close}>
            Отмена
          </TextButton>
          <TextButton>Удалить категорию</TextButton>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default RemoveCategoryModal
