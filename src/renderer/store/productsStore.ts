import { action, makeAutoObservable, observable } from 'mobx'

import productsApi from 'renderer/api/products.api'

import ICategory from 'renderer/types/ICategory'
import IProduct from 'renderer/types/IProduct'

class ProductsStore {
  @observable categories: ICategory[] = []
  @observable products: IProduct[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @action setCategories(categories: ICategory[]) {
    this.categories = categories
  }

  @action setProducts(products: IProduct[]) {
    this.products = products
  }

  @action init() {
    const categories = productsApi.getCategories()

    // need check
    if (!categories) {
      productsApi.setCategories([])
    }

    this.setCategories(categories)
  }
}

export default ProductsStore
