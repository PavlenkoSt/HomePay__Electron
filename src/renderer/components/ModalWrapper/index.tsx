import { Dispatch, FC, SetStateAction } from 'react'
import Modal from 'react-modal'
import CloseBtn from '../Btns/CloseBtn'

import styles from './styles.module.scss'

type ModalWrapperPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const ModalWrapper: FC<ModalWrapperPropsType> = ({ children, visible, setVisible }) => {
  return (
    <Modal
      overlayClassName={styles.overlay}
      isOpen={visible}
      onRequestClose={() => setVisible(false)}
    >
      <div className={styles.btnContainer}>
        <CloseBtn setVisible={() => setVisible(false)} />
      </div>
      <div>{children}</div>
    </Modal>
  )
}

export default ModalWrapper
