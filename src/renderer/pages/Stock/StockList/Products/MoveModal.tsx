import { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react'
import Select from 'react-select'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'
import ToastService from 'renderer/services/ToastService'
import { useStore } from 'renderer/store'
import IProduct from 'renderer/types/IProduct'

import styles from './MoveModal.module.scss'

type MoveModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  product: IProduct
}

const MoveModal: FC<MoveModalPropsType> = ({ visible, setVisible, product }) => {
  const { productsStore } = useStore()

  const [category, setCategory] = useState<null | any>(
    {
      value: product.categoryId,
      label: productsStore.categories.find((category) => category.id === product.categoryId)?.name,
    } || null
  )

  const close = useCallback(() => setVisible(false), [])

  const move = useCallback(() => {
    productsStore.moveProductToOtherCategory(product, category.value)
    ToastService.showSuccess('Товар успешно перемещен')
  }, [category])

  const options = useMemo(
    () =>
      productsStore.categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [productsStore.categories]
  )

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Переместить</h2>
        <div className={styles.select}>
          <Select
            value={category}
            placeholder="В категорию"
            noOptionsMessage={() => <div>Нет доступных категорий</div>}
            options={options}
            isSearchable
            onChange={(option) => option?.value && setCategory(option)}
          />
        </div>
        <div className={styles.btns}>
          <TextButton onClick={close}>Отмена</TextButton>
          <TextButton onClick={move} type={ButtonTypeEnum.PRIMARY}>
            Переместить
          </TextButton>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default MoveModal
