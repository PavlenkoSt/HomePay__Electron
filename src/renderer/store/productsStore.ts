import { action, computed, makeAutoObservable, observable } from 'mobx'

import JSONCorrect from 'renderer/helpers/JSONCorrect'
import productsApi from 'renderer/api/products.api'
import ICategory from 'renderer/types/ICategory'
import IProduct from 'renderer/types/IProduct'

class ProductsStore {
  @observable categories: ICategory[] = []
  @observable products: IProduct[] = []
  @observable activeCategoryId: number | null | 'all-products' = null
  @observable searchableProducts: IProduct[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @action setSearchableProduct(value: string) {
    if (this.activeCategoryId === 'all-products') {
      this.searchableProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
    } else {
      this.searchableProducts = this.products.filter(
        (product) =>
          product.categoryId === this.activeCategoryId &&
          product.name.toLowerCase().includes(value.toLowerCase())
      )
    }
  }

  @action setActiveCategoryId(categoryId: number | null | 'all-products') {
    this.activeCategoryId = categoryId
  }

  @action setCategories(categories: ICategory[]) {
    this.categories = categories
  }

  @action addCategory(category: ICategory) {
    const categories = JSONCorrect([...this.categories, category])
    this.setCategories(categories)
    productsApi.setCategories(categories)
  }

  @action removeCategory(categoryId: number) {
    const filteredCategories = this.categories.filter((category) => category.id !== categoryId)

    const resultCategories = JSONCorrect(filteredCategories)

    this.setCategories(resultCategories)
    productsApi.setCategories(resultCategories)
  }

  @action removeCategoryWithAllProducts(categoryId: number) {
    const categoryProductsId = this.products
      .filter((product) => product.categoryId === categoryId)
      .map((product) => product.categoryId)

    this.removeProductMany(categoryProductsId)
    this.removeCategory(categoryId)
  }

  @action removeCategoryWithMoveProducts(categoryId: number, categoryIdMoveTo: number) {
    const targetProducts = this.products
      .filter((product) => product.categoryId === categoryId)
      .map((product) => ({ ...product, categoryId: categoryIdMoveTo }))

    this.moveProductsToOtherCategory(targetProducts)
    this.plusCategoryProductsCount(categoryIdMoveTo, targetProducts.length)
    this.removeCategory(categoryId)
  }

  @action editCategoryName(categoryId: number, categoryName: string) {
    const targetCategory = this.categories.find((category) => category.id === categoryId)

    if (targetCategory) {
      this.saveCategories([
        ...this.categories.filter((category) => category.id !== categoryId),
        { ...targetCategory, name: categoryName },
      ])
    }
  }

  @action plusCategoryProductsCount(categoryId: number, count: number) {
    const category = this.categories.find((category) => category.id === categoryId)

    if (!category) return

    category.productsCount += count

    this.saveCategories([category, ...this.categories.filter((cat) => cat.id !== categoryId)])
  }

  @action moveProductsToOtherCategory(products: IProduct[]) {
    const ids = products.map((product) => product.id)

    const filteredProducts = this.removeProductsFromListByIdsArr(ids)

    this.saveProducts([...filteredProducts, ...products])
  }

  @action moveProductToOtherCategory(product: IProduct, toCategory: number) {
    this.changeCategoryProductCount(product.categoryId, 'decrement')

    const updatedProduct = product
    updatedProduct.categoryId = toCategory

    this.changeCategoryProductCount(toCategory, 'increment')
    this.saveProducts([...this.products.filter((prod) => prod.id !== product.id), updatedProduct])
  }

  @action removeProductMany(arrayId: number[]) {
    const filteredProducts = this.removeProductsFromListByIdsArr(arrayId)
    this.saveProducts(filteredProducts)
  }

  @action removeProductOne(productId: number, categoryId: number) {
    this.saveProducts(this.products.filter((product) => product.id !== productId))
    this.changeCategoryProductCount(categoryId, 'decrement')
  }

  @action addOneProductDB(product: IProduct) {
    this.changeCategoryProductCount(product.categoryId, 'increment')
    this.saveProducts([product, ...this.products])
  }

  @action editProductDB(product: IProduct, editId: number) {
    this.saveProducts([...this.products.filter((prod) => prod.id !== editId), product])
  }

  @action changeCategoryProductCount(categoryId: number, type: 'increment' | 'decrement') {
    const findedCategory = this.categories.find((cat) => cat.id === categoryId)

    if (!findedCategory) return

    if (type === 'increment') {
      findedCategory.productsCount += 1
    } else {
      findedCategory.productsCount -= 1
    }

    this.saveCategories([
      findedCategory,
      ...this.categories.filter((category) => category.id !== categoryId),
    ])
  }

  @action saveProducts(productsProxy: IProduct[]) {
    const products = JSONCorrect(productsProxy)

    this.setProducts(products)
    productsApi.setProducts(products)
  }

  @action saveCategories(categoriesProxy: ICategory[]) {
    const categories = JSONCorrect(categoriesProxy)

    this.setCategories(categories)
    productsApi.setCategories(categories)
  }

  @action setProducts(products: IProduct[]) {
    this.products = products
  }

  @action removeProductsFromListByIdsArr(idsArr: number[]) {
    const filteredProducts = this.products.filter((product) => {
      for (let i = 0; i < idsArr.length; i++) {
        if (product.categoryId === idsArr[i]) {
          return false
        }
      }

      return true
    })

    return filteredProducts
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

  @computed activeCategoryName() {
    return (
      this.categories.find((category) => category.id === this.activeCategoryId)?.name ||
      'Все товары'
    )
  }

  @computed activeCategoryCount() {
    if (this.activeCategoryName() === 'Все товары') {
      return this.products.length
    }

    return (
      this.categories.find((category) => category.id === this.activeCategoryId)?.productsCount || 0
    )
  }

  @computed activeCategoryProducts() {
    if (this.activeCategoryId === 'all-products') {
      return this.searchableProducts
    }

    return this.searchableProducts.filter((product) => product.categoryId === this.activeCategoryId)
  }

  @computed sortedCategories() {
    //@ts-ignore
    return this.categories.slice().sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
  }
}

export default ProductsStore
