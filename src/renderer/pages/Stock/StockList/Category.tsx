import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import ICategory from 'renderer/types/ICategory'

import styles from './styles.module.scss'
import numWord from 'renderer/helpers/numWord'

type CategoryPropsType = {
  category: ICategory
}

const Category: FC<CategoryPropsType> = ({ category }) => {
  const { productsCount, name } = category

  const positions =
    productsCount > 0 ? numWord(productsCount, ['позиция', 'позиции', 'позиций']) : ''

  return (
    <div className={styles.category}>
      <h3 className={styles.categoryName}>{name}</h3>
      <span className={styles.categoryCount}>{`(${productsCount} ${positions})`}</span>
    </div>
  )
}

export default observer(Category)
