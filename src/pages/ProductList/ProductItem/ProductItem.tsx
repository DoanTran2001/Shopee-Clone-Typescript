import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product } from 'src/types/product.type'
import { path } from 'src/utils/constants'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface ProductItemProps {
  product: Product
}

function ProductItem({ product }: ProductItemProps) {
  return (
    <Link to={`${path.home}${generateNameId(product.name, product._id)}`} className=''>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        {/* Thẻ div dùng pt-100% relative và thẻ image: absolute, w-full, h-full, top-0, left-0: để hình ảnh luôn luôn là hình vuông( chiều cao luôn luôn bằng chiều rộng) */}
        <div className='w-full pt-[100%] relative'>
          <img src={product.image} alt={product.name} className='w-full h-full object-cover absolute top-0 left-0' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-sm'>đ</span>
              <span className='text-base font-medium'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating}/>
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
