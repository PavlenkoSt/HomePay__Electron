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
            options={productsOptions}
            onChange={(options) => {
              setSelectedProducts(options.map((option) => option.product))
            }}
          />
        </div>
        {!!selectedProducts.length && <SelectedList selectedProducts={selectedProducts} />}
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
