import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import ICategory from 'renderer/types/ICategory'

import styles from './styles.module.scss'
import numWord from 'renderer/helpers/numWord'

type CategoryPropsType = {
  category: ICategory
}

const Category: FC<CategoryPropsType> = ({ category }) => {
  const positions = numWord(category.productsCount, ['позиция', 'позиции', 'позиций'])

  return (
    <div className={styles.category}>
      <h3 className={styles.categoryName}>{category.name}</h3>
      <span className={styles.categoryCount}>{`(${category.productsCount} ${positions})`}</span>
    </div>
  )
}

export default observer(Category)
