import { Dispatch, FC, SetStateAction } from 'react'
import { observer } from 'mobx-react-lite'
import Select from 'react-select'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'
import useAddProduct from 'renderer/hooks/products/useAddProduct'
import Input from 'renderer/components/Form/Input'
import IProduct from 'renderer/types/IProduct'
import { useStore } from 'renderer/store'

import styles from './AddProductModal.module.scss'

type AddProductModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  editMode?: boolean
  product?: IProduct
  editId?: number
}

const AddProductModal: FC<AddProductModalPropsType> = ({
  visible,
  setVisible,
  editMode,
  product,
  editId,
}) => {
  const { addProduct, close, options, setCategoryId, formData, formDataSetters, errors } =
    useAddProduct({ setVisible, editId: editId || null, initialValues: product || null })

  const { productsStore } = useStore()

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">{editMode ? 'Редактировать' : 'Добавить товар'}</h2>
        <div>
          <div className={styles.form}>
            {productsStore.activeCategoryId === 'all-products' && !editMode && (
              <div className={styles.select}>
                <Select
                  placeholder="В категорию"
                  noOptionsMessage={() => <div>Нет доступных категорий</div>}
                  options={options}
                  isSearchable
                  onChange={(option) => option?.value && setCategoryId(option.value)}
                />
              </div>
            )}
            <Input
              label="Название"
              value={formData.name}
              setValue={formDataSetters.nameSetter}
              error={errors.nameErr}
              errorMessage="Название не может быть пустым"
            />
            <div className={styles.topic}>Цена:</div>
            <div className={styles.doubles}>
              <Input
                label="Закупочная"
                value={formData.retailPrice.toString()}
                setValue={formDataSetters.retailPriceSetter}
                error={errors.retailPriceErr}
                errorMessage="Некорректная цена"
                type="number"
                doubles
              />
              <Input
                label="Продажная"
                value={formData.wholesalePrice.toString()}
                setValue={formDataSetters.wholesalePriceSetter}
                error={errors.wholesalePriceErr}
                errorMessage="Некорректная цена"
                type="number"
                doubles
              />
            </div>
            <div className={styles.topic}>Наценка:</div>
            <div className={styles.doubles}>
              <Input
                label="В валюте"
                value={formData.marginValue.toString()}
                setValue={formDataSetters.marginValueSetter}
                error={errors.marginValueErr}
                errorMessage="Некорректная наценка"
                type="number"
                doubles
              />
              <Input
                label="В процентах"
                value={formData.marginPercent.toString()}
                setValue={formDataSetters.marginPercentSetter}
                error={errors.marginPercentErr}
                errorMessage="Некорректная наценка"
                type="number"
                doubles
              />
            </div>
            <Input
              label="Количество"
              value={formData.count.toString()}
              setValue={formDataSetters.countSetter}
              error={errors.countErr}
              errorMessage="Некорректное количество"
              type="number"
            />
          </div>
          <div className={styles.btns}>
            <TextButton onClick={close}>Отмена</TextButton>
            <TextButton onClick={addProduct} type={ButtonTypeEnum.PRIMARY}>
              {editMode ? 'Редактировать' : 'Добавить'}
            </TextButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default observer(AddProductModal)
