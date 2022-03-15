import { action, makeAutoObservable, observable } from 'mobx'

import JSONCorrect from 'renderer/helpers/JSONCorrect'
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

  @action addCategory(category: ICategory) {
    const categories = JSONCorrect([...this.categories, category])
    this.setCategories(categories)
    productsApi.setCategories(categories)
  }

  @action removeCategoryWithAllProducts(categoryId: number) {
    const categoryProductsId = this.products
      .filter((product) => product.categoryId === categoryId)
      .map((product) => product.categoryId)

    this.removeProductMany(categoryProductsId)

    const filteredCategories = this.categories.filter((category) => category.id !== categoryId)

    const resultCategories = JSONCorrect(filteredCategories)

    this.setCategories(resultCategories)
    productsApi.setCategories(resultCategories)
  }

  @action removeProductMany(arrayId: (number | null)[]) {
    const filteredProducts = this.products.filter((product) => {
      for (let i = 0; i < arrayId.length; i++) {
        if (product.categoryId === arrayId[i]) {
          return false
        }
      }

      return true
    })

    const products = JSONCorrect(filteredProducts)

    this.setProducts(products)
    productsApi.setProducts(products)
  }

  @action setProducts(products: IProduct[]) {
    this.products = products
  }

  @action init() {
    const categories = productsApi.getCategories()
    const products = productsApi.getProducts()

    // need check
    if (!categories) {
      productsApi.setCategories([])
    }

    if (!products) {
      productsApi.setProducts([])
    }

    this.setCategories(categories)
    this.setProducts(products)
  }
}

export default ProductsStore
