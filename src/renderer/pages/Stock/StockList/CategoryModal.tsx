import { Dispatch, FC, SetStateAction } from 'react'
import ModalWrapper from 'renderer/components/ModalWrapper'

type CategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const CategoryModal: FC<CategoryModalPropsType> = ({ visible, setVisible }) => {
  return (
    <ModalWrapper visible={visible} setVisible={setVisible}>
      <div>123</div>
    </ModalWrapper>
  )
}

export default CategoryModal
