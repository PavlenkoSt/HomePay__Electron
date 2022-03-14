import { Dispatch, FC, SetStateAction, useCallback } from 'react'
import { Radio, useRadioState } from 'pretty-checkbox-react'
import Select from 'react-select'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'
import { useStore } from 'renderer/store'
import ICategory from 'renderer/types/ICategory'

import styles from './styles.module.scss'

enum ProductsActionEnum {
  SAVE = 'SAVE',
  REMOVE = 'REMOVE',
  MOVE = 'MOVE',
}

type RemoveCategoryModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  category: ICategory
}

const RemoveCategoryModal: FC<RemoveCategoryModalPropsType> = ({
  visible,
  setVisible,
  category,
}) => {
  const { state: radioStatus, onChange: onChangeRadio } = useRadioState({
    state: ProductsActionEnum.REMOVE,
  })

  const close = useCallback(() => setVisible(false), [])
  const remove = () => {
    console.log('removeAllProductsInside', radioStatus)
  }

  const { productsStore } = useStore()

  const otherCategories = [...productsStore.categories].filter(
    (categoryStore) => categoryStore.id !== category.id
  )

  const options = otherCategories.map((cat) => ({ value: cat.id, label: cat.name }))

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Удаление категории - {category.name}</h2>
        <div className={styles.bodyRemoveModal}>
          <div className={styles.checkboxesContainer}>
            <Radio
              value={ProductsActionEnum.REMOVE}
              state={radioStatus}
              onChange={onChangeRadio}
              name="productsAction"
              shape="curve"
              variant="thick"
              color="danger-o"
              checked={radioStatus === ProductsActionEnum.REMOVE}
            >
              Удалить все товары внутри
            </Radio>
            <Radio
              value={ProductsActionEnum.SAVE}
              state={radioStatus}
              onChange={onChangeRadio}
              name="productsAction"
              shape="curve"
              variant="thick"
              color="warning-o"
            >
              Сохранить товары и присвоить статус "Без категории"
            </Radio>
            <Radio
              value={ProductsActionEnum.MOVE}
              state={radioStatus}
              onChange={onChangeRadio}
              name="productsAction"
              shape="curve"
              variant="thick"
              color="warning-o"
              disabled={!otherCategories.length}
            >
              Сохранить товары и переместить в другую категорию
            </Radio>
            <Select
              isDisabled={radioStatus !== ProductsActionEnum.MOVE}
              placeholder="Выберите категорию"
              noOptionsMessage={() => <div>Нет доступных категорий</div>}
              options={options}
              isSearchable
            />
          </div>
        </div>
        <div className={styles.btnsRemoveModal}>
          <TextButton type={ButtonTypeEnum.PRIMARY} onClick={close}>
            Отмена
          </TextButton>
          <TextButton onClick={remove}>Удалить категорию</TextButton>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default RemoveCategoryModal
