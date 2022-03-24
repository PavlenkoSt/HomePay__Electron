import { Dispatch, FC, SetStateAction, useCallback } from 'react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'
import ToastService from 'renderer/services/ToastService'
import { useStore } from 'renderer/store'
import IProduct from 'renderer/types/IProduct'

import styles from './RemoveProductModal.module.scss'

type RemoveProductModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  product: IProduct
}

const RemoveProductModal: FC<RemoveProductModalPropsType> = ({ visible, setVisible, product }) => {
  const { productsStore } = useStore()

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const remove = useCallback(() => {
    productsStore.removeProductOne(product.id, product.categoryId)
    setVisible(false)
    ToastService.showSuccess('Товар успешно удален')
  }, [product])

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Удаление товара - {product.name}</h2>
        <div className={styles.body}>
          Вы действительно хотите удалить <span className={styles.prod}>{product.name}</span> из
          списка продуктов?
        </div>
        <div className={styles.btns}>
          <TextButton type={ButtonTypeEnum.PRIMARY} onClick={close}>
            Отмена
          </TextButton>
          <TextButton onClick={remove}>Удалить</TextButton>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default RemoveProductModal
