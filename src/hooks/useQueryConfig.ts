import { ProductConfig } from 'src/types/product.type'
import useQueryParams from './useQueryParams'
import omitBy  from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

export type QueryConfig = {
  [key in keyof ProductConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams() // Lấy tất cả giá trị của queryParams trên URL
  // Chỉ lấy những params được quy định có kiểu queryConfig, đồng thời loại bỏ những giá trị nào undefined (dùng lodash để loại bỏ những giá trị nào là undefined)
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page,
      exclude: queryParams.exclude,
      limit: queryParams.limit,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
