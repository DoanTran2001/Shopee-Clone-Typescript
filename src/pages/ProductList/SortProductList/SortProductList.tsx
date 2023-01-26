import classNames from 'classnames'
import  omit  from 'lodash/omit'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductConfig } from 'src/types/product.type'
import { path, sortBy, order as orderConstants } from 'src/utils/constants'

interface SortProductListProps {
  queryConfig: QueryConfig
  pageSize: number // Tổng số trang
}

function SortProductList({ pageSize, queryConfig }: SortProductListProps) {
  const page = Number(queryConfig.page) || 1

  const { order, sort_by = sortBy.createAt } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: NonNullable<ProductConfig['sort_by']>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: NonNullable<ProductConfig['sort_by']>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit({
        ...queryConfig,
        sort_by: sortByValue
      }, ['order'])).toString()
    })
  }

  const handlePriceOrder = (orderValue: NonNullable<ProductConfig['order']>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3 rounded-lg'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className=''>Sắp xếp theo</div>
          <button
            className={classNames('h-9 px-4 text-center text-sm capitalize rounded-tl-2xl rounded-br-2xl rounded-sm ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-9 px-4 text-center text-sm capitalize rounded-tl-2xl rounded-br-2xl rounded-sm ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createAt)
            })}
            onClick={() => handleSort(sortBy.createAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-9 px-4 text-center text-sm capitalize rounded-tl-2xl rounded-br-2xl rounded-sm ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            name=''
            id=''
            className={classNames(
              'h-9  px-4 text-left text-sm capitalize  outline-none rounded-tl-2xl rounded-br-2xl rounded-sm',
              {
                'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
                'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
              }
            )}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as NonNullable<ProductConfig['order']>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstants.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstants.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className='flex items-center'>
          <div className=''>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='h-9 p-2 rounded-tl-md rounded-bl-md flex items-center text-gray-400 bg-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='h-9 p-2 rounded-tl-md rounded-bl-md bg-white flex items-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-4 w-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='h-9 p-2 rounded-tr-md rounded-br-md flex items-center text-gray-400 bg-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='h-9 p-2 rounded-tr-md rounded-br-md flex items-center text-gray-900 bg-white'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
