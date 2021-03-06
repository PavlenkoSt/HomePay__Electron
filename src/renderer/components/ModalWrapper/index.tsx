import { FC } from 'react'
import Modal from 'react-modal'

import CloseBtn from '../Btns/CloseBtn'

import styles from './styles.module.scss'

type ModalWrapperPropsType = {
  visible: boolean
  close: () => void
}

const ModalWrapper: FC<ModalWrapperPropsType> = ({ children, visible, close }) => {
  return (
    <Modal
      overlayClassName={styles.overlay}
      isOpen={visible}
      onRequestClose={close}
      style={{
        content: {
          top: '100px',
          bottom: 'auto',
          overflow: 'unset',
          width: 800,
          left: 'calc(50% - 400px)',
          padding: '14px 20px 20px'
        },
      }}
    >
      <div className={styles.btnContainer}>
        <CloseBtn setVisible={close} />
      </div>
      <div>{children}</div>
    </Modal>
  )
}

export default ModalWrapper
