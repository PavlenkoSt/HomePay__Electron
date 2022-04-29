import Select from 'react-select'

import useIncome from 'renderer/hooks/budget/useIncome'
import SelectedList from './SelectedList'

import styles from './styles.module.scss'

const Incomes = () => {
  const { selectedProducts, setSelectedProducts, productsOptions } = useIncome()

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
        {/* <Input
          label="Сумма"
          value={sum}
          setValue={setSum}
          error={sumError}
          errorMessage="Значение не может быть меньше нуля"
          type="number"
        /> */}
      </div>
    </div>
  )
}

export default Incomes
