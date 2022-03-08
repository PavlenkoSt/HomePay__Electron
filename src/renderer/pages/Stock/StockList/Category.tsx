import { FC } from 'react'
import ICategory from 'renderer/types/ICategory'

type CategoryPropsType = {
  category: ICategory
}

const Category: FC<CategoryPropsType> = ({ category }) => {
  return <div>{category.name}</div>
}

export default Category
