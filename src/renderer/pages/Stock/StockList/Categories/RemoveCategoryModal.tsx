import { Dispatch, FC, SetStateAction } from 'react'
import { Radio } from 'pretty-checkbox-react'
import Select from 'react-select'

import useRemoveCategory, { ProductsActionEnum } from 'renderer/hooks/useRemoveCategory'
import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'
import ICategory from 'renderer/types/ICategory'

import styles from './RemoveCategoryModal.module.scss'

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
  const {
    close,
    remove,
    onChangeRadio,
    radioStatus,
    options,
    otherCategoriesLength,
    setSelectCatId,
  } = useRemoveCategory({
    setVisible,
    category,
  })

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Удаление категории - {category.name}</h2>
        <div className={styles.body}>
          <div className={styles.checkboxes}>
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
              value={ProductsActionEnum.MOVE}
              state={radioStatus}
              onChange={onChangeRadio}
              name="productsAction"
              shape="curve"
              variant="thick"
              color="warning-o"
              disabled={!otherCategoriesLength}
            >
              Сохранить товары и переместить в другую категорию
            </Radio>
            <Select
              isDisabled={radioStatus !== ProductsActionEnum.MOVE}
              placeholder="Выберите категорию"
              noOptionsMessage={() => <div>Нет доступных категорий</div>}
              options={options}
              isSearchable
              onChange={(option) => option?.value && setSelectCatId(option.value)}
            />
          </div>
        </div>
        <div className={styles.btns}>
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
