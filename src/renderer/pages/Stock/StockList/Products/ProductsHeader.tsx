import { observer } from 'mobx-react-lite'

import CloseBtn from 'renderer/components/Btns/CloseBtn'
import Input from 'renderer/components/Form/Input'
import numWord from 'renderer/helpers/numWord'
import { useStore } from 'renderer/store'

import styles from './ProductsHeader.module.scss'

import backArrow from 'renderer/assets/arrow.svg'
import { Dispatch, FC, SetStateAction } from 'react'

type ProductsHeaderPropsType = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

const ProductsHeader: FC<ProductsHeaderPropsType> = ({ search, setSearch }) => {
  const { productsStore } = useStore()

  const productsCount = numWord(productsStore.activeCategoryCount(), ['товар', 'товара', 'товаров'])

  return (
    <div className={styles.header}>
      <div className={styles.main}>
        <div className={styles.btn} onClick={() => productsStore.setActiveCategoryId(null)}>
          <img src={backArrow} className={styles.pic} />
          <span className={styles.btnText}>К категориям</span>
        </div>
        <div>/</div>
        <div
          className={styles.category}
        >{`${productsStore.activeCategoryName()} (${productsStore.activeCategoryCount()} ${productsCount})`}</div>
      </div>
      <div className={styles.searchField}>
        <Input label="Поиск" value={search} setValue={setSearch} />
        {!!search && (
          <div className={styles.close}>
            <CloseBtn setVisible={() => setSearch('')} small />
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(ProductsHeader)
