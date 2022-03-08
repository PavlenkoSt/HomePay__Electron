import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import ICategory from 'renderer/types/ICategory'
import numWord from 'renderer/helpers/numWord'

import styles from './styles.module.scss'

type CategoryPropsType = {
  category: ICategory
}

const Category: FC<CategoryPropsType> = ({ category }) => {
  const { productsCount, name } = category

  const positions = numWord(productsCount, ['позиция', 'позиции', 'позиций'])

  return (
    <div className={styles.category}>
      <h3 className={styles.categoryName}>{name}</h3>
      <span className={styles.categoryCount}>
        {!!productsCount ? `(${productsCount} ${positions})` : 'пока нет позиций'}
      </span>
    </div>
  )
}

export default observer(Category)
