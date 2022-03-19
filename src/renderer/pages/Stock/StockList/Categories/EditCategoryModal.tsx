import { Dispatch, FC, SetStateAction } from 'react'

import ModalWrapper from 'renderer/components/ModalWrapper'
import ICategory from 'renderer/types/ICategory'

type EditCategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  category: ICategory
}

const EditCategoryModal: FC<EditCategoryModalPropsType> = ({ visible, setVisible, category }) => {
  return (
    <ModalWrapper
      visible={visible}
      close={() => {
        setVisible(false)
      }}
    >
      <div>123</div>
    </ModalWrapper>
  )
}

export default EditCategoryModal
