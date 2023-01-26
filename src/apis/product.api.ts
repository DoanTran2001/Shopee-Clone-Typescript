import { Product, ProductConfig, Products } from "src/types/product.type"
import { SuccessResponse } from "src/types/utils.type"
import http from "src/utils/http"

const URL = 'products'

const productApi = {
  getProducts(params: ProductConfig) {
    return http.get<SuccessResponse<Products>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}

export default productApi