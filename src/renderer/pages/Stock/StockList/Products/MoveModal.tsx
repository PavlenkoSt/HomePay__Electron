import { Dispatch, FC, SetStateAction, useCallback } from 'react'

import ModalWrapper from 'renderer/components/ModalWrapper'

import styles from './MoveModal.module.scss'

type MoveModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const MoveModal: FC<MoveModalPropsType> = ({ visible, setVisible }) => {
  const close = useCallback(() => setVisible(false), [])

  return <ModalWrapper visible={visible} close={close}>
    <div>

    </div>
  </ModalWrapper>
}

export default MoveModal
