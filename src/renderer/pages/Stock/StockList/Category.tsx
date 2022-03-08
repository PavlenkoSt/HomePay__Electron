import { FC } from 'react'

import ICategory from 'renderer/types/ICategory'

import styles from './styles.module.scss'

type CategoryPropsType = {
  category: ICategory
}

const Category: FC<CategoryPropsType> = ({ category }) => {
  return (
    <div className={styles.category}>
      <h3 className={styles.categoryName}>{category.name}</h3>
      <span className={styles.categoryCount}>{`(${category.productsCount} позиция)`}</span>
    </div>
  )
}

export default Category
