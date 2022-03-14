import { Dispatch, FC, SetStateAction } from 'react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'

type RemoveCategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const RemoveCategoryModal: FC<RemoveCategoryModalPropsType> = ({ visible, setVisible }) => {
  return (
    <ModalWrapper visible={visible} close={() => setVisible(false)}>
      <div>
        <div>
          <TextButton type={ButtonTypeEnum.DANGER}>Да</TextButton>
          {/* <TextButton>Нет</TextButton> */}
        </div>
      </div>
    </ModalWrapper>
  )
}

export default RemoveCategoryModal
