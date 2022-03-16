import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import ICategory from 'renderer/types/ICategory'
import numWord from 'renderer/helpers/numWord'
import RemoveCategoryModal from './RemoveCategoryModal'

import styles from './CategoryItem.module.scss'

import closePic from 'renderer/assets/close.svg'

type CategoryPropsType = {
  category: ICategory
}

const CategoryItem: FC<CategoryPropsType> = ({ category }) => {
  const { productsCount, name } = category

  const positions = numWord(productsCount, ['позиция', 'позиции', 'позиций'])

  const [showRemove, setShowRemove] = useState(false)

  return (
    <div className={styles.category}>
      <h3 className={styles.categoryName}>{name}</h3>
      <span className={styles.categoryCount}>
        {!!productsCount ? `(${productsCount} ${positions})` : '(пока нет позиций)'}
      </span>
      <div onClick={() => setShowRemove(true)} className={styles.removeBtnContainer}>
        <img src={closePic} />
      </div>
      {showRemove && (
        <RemoveCategoryModal visible={showRemove} setVisible={setShowRemove} category={category} />
      )}
    </div>
  )
}

export default observer(CategoryItem)
