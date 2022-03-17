import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import ICategory from 'renderer/types/ICategory'
import numWord from 'renderer/helpers/numWord'
import RemoveCategoryModal from './RemoveCategoryModal'
import { useStore } from 'renderer/store'

import styles from './CategoryItem.module.scss'

import closePic from 'renderer/assets/close.svg'
import editPic from 'renderer/assets/edit.svg'

type CategoryPropsType = {
  category: ICategory
}

const CategoryItem: FC<CategoryPropsType> = ({ category }) => {
  const { productsCount, name } = category

  const positions = numWord(productsCount, ['позиция', 'позиции', 'позиций'])

  const [showRemove, setShowRemove] = useState(false)

  const { productsStore } = useStore()

  return (
    <>
      <div
        className={styles.category}
        onClick={() => productsStore.setActiveCategoryId(category.id)}
      >
        <h3 className={styles.categoryName}>{name}</h3>
        <span className={styles.categoryCount}>
          {!!productsCount ? `(${productsCount} ${positions})` : '(пока нет позиций)'}
        </span>
        <div
          title="Редактировать"
          onClick={(e) => {
            e.stopPropagation()
            // editModal
          }}
          className={styles.editBtn}
        >
          <img className={styles.icon} src={editPic} />
        </div>
        <div
          title="Удалить"
          onClick={(e) => {
            e.stopPropagation()
            setShowRemove(true)
          }}
          className={styles.removeBtnContainer}
        >
          <img src={closePic} />
        </div>
      </div>
      {showRemove && (
        <RemoveCategoryModal visible={showRemove} setVisible={setShowRemove} category={category} />
      )}
    </>
  )
}

export default observer(CategoryItem)
