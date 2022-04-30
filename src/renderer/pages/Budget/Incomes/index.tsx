import Select from 'react-select'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import useIncome from 'renderer/hooks/budget/useIncome'
import formatWithFloat from 'renderer/utilts/formatWithFloat'
import SelectedList from './SelectedList'

import styles from './styles.module.scss'

const Incomes = () => {
  const { selectedProducts, setSelectedProducts, productsOptions, selectedProductsSum, pay } =
    useIncome()

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.item}>
          <Select
            isMulti
            isSearchable
            placeholder="Товары на продажу"
            noOptionsMessage={() => <div>Нет доступных товаров</div>}
            //@ts-ignore
            options={productsOptions}
            value={selectedProducts.map((product) => ({
              value: product.id,
              label: product.name,
              currentCount: product.currentCount,
              product: product,
            }))}
            onChange={(options) => {
              setSelectedProducts(
                options.map((option) => ({
                  ...option.product,
                  currentCount: option.product.count > 0 ? 1 : 0,
                }))
              )
            }}
          />
        </div>
        {!!selectedProducts.length && (
          <SelectedList
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        )}
        {selectedProductsSum > 0 && (
          <div className={styles.footer}>
            <div className={styles.fullSum}>
              <div className={styles.fullSumLabel}>Всего к оплате:</div>
              <div className={styles.fullSumNumber}>
                {formatWithFloat(selectedProductsSum, true)}
              </div>
            </div>
            <TextButton type={ButtonTypeEnum.PRIMARY} onClick={pay}>
              Оплечено
            </TextButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default Incomes
