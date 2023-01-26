import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Paginate from 'src/components/Paginate'
import { ProductConfig } from 'src/types/product.type'
import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortProductList from './SortProductList'
import useQueryConfig from 'src/hooks/useQueryConfig'
import categoryApi from 'src/apis/category.api'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function ProductList() {
  const queryConfig = useQueryConfig() // Lấy những queryParams cần thiết trên thanh URL
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories()
  })
  return (
    <HelmetProvider>
      <div className='bg-gray-200 py-6'>
        <Helmet>
          <title>Trang chủ | Shop</title>
          <meta name='description' content='Trang chủ' />
        </Helmet>
        <div className='container'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>
            {productsData && (
              <div className='col-span-9'>
                <SortProductList queryConfig={queryConfig} pageSize={productsData?.data.data.pagination.page_size} />
                <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                  {productsData.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <ProductItem product={product} />
                    </div>
                  ))}
                </div>
                <Paginate queryConfig={queryConfig} pageSize={productsData?.data.data.pagination.page_size} />
              </div>
            )}
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}
