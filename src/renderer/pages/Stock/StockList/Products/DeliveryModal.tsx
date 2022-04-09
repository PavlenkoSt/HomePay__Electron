import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import Input from 'renderer/components/Form/Input'
import ModalWrapper from 'renderer/components/ModalWrapper'
import ToastService from 'renderer/services/ToastService'
import { useStore } from 'renderer/store'
import IProduct from 'renderer/types/IProduct'

import styles from './DeliveryModal.module.scss'

type DeliveryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  product: IProduct
}

const DeliveryModal: FC<DeliveryModalPropsType> = ({ visible, setVisible, product }) => {
  const [count, setCount] = useState(1)

  const { productsStore } = useStore()

  const delivery = useCallback(() => {
    productsStore.deliveryProduct(product.id, count)

    ToastService.showSuccess('Завоз успешен')
    setVisible(false)
    setCount(1)
  }, [count, product])

  const close = useCallback(() => {
    setVisible(false)
    setCount(1)
  }, [])

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">
          Завоз товара - <i>{product.name}</i>
        </h2>
        <div className={styles.body}>
          <div className={styles.param}>
            Закупочная цена за 1 единицу: <b>{product.price.retail.toFixed(2)} ₴</b>
          </div>
          <div className={styles.input}>
            <Input
              label="Количество единиц"
              value={count}
              setValue={(val: string) => setCount(+val)}
              type="number"
            />
          </div>
          <div className={styles.param}>
            К оплате: <b>{(product.price.retail * count).toFixed(2)} ₴</b>
          </div>
        </div>
        <div className={styles.btns}>
          <TextButton onClick={close}>Отмена</TextButton>
          <TextButton onClick={delivery} type={ButtonTypeEnum.PRIMARY}>
            Завезти
          </TextButton>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default DeliveryModal
