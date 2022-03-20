import { Dispatch, FC, SetStateAction } from 'react'
import { observer } from 'mobx-react-lite'
import Select from 'react-select'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'
import useAddProduct from 'renderer/hooks/products/useAddProduct'
import { useStore } from 'renderer/store'

import styles from './AddProductModal.module.scss'
import Input from 'renderer/components/Form/Input'

type AddProductModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const AddProductModal: FC<AddProductModalPropsType> = ({ visible, setVisible }) => {
  const { addProduct, close, options, setCategoryId, formData, formDataSetters, errors } =
    useAddProduct({ setVisible })

  const { productsStore } = useStore()

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Добавить товар</h2>
        <div>
          <div className={styles.form}>
            {productsStore.activeCategoryId === 'all-products' && (
              <Select
                placeholder="В категорию"
                noOptionsMessage={() => <div>Нет доступных категорий</div>}
                options={options}
                isSearchable
                onChange={(option) => option?.value && setCategoryId(option.value)}
              />
            )}
            <Input
              label="Название"
              value={formData.name}
              setValue={formDataSetters.nameSetter}
              error={errors.nameErr}
              errorMessage="Название"
            />
            <div className={styles.doubles}>
              <Input
                label="Название"
                value={formData.name}
                setValue={formDataSetters.nameSetter}
                error={errors.nameErr}
                errorMessage="Название"
                doubles
              />
              <Input
                label="Название"
                value={formData.name}
                setValue={formDataSetters.nameSetter}
                error={errors.nameErr}
                errorMessage="Название"
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
              Добавить
            </TextButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default observer(AddProductModal)
