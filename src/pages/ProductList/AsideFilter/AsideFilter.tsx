import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import  omit  from 'lodash/omit'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { createSearchParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'
import { NoUndefinedField } from 'src/types/utils.type'
import { path } from 'src/utils/constants'
import { Schema, schema } from 'src/utils/rules'
import RatingStar from '../RatingStar'

type AsideFilterProps = {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

function AsideFilter({ categories, queryConfig }: AsideFilterProps) {
  // const [_, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const { category } = queryConfig
  // const handleClickCate = () => {
  //   const params = { ...queryConfig, name: 'áo' }
  //   setSearchParams(params)
  // }
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema)
  })
  const navigate = useNavigate()
  const submitPrice = (value: FormData) => {
    console.log(value)
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: value.price_max,
        price_min: value.price_min
      }).toString()
    })
  }
  // console.log(errors)
  const handleRemoveAll = () => {
    const searchParams = omit(queryConfig, ['price_max', 'price_min', 'category', 'rating_filter'])
    navigate({
      pathname: path.home,
      search: createSearchParams(searchParams).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t("aside filter.all categories")}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {categories.map((cate) => (
          <li className='py-1 pl-2' key={cate._id}>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  category: cate._id
                }).toString()
              }}
              className='relative px-2 block'
            >
              {cate._id === category && (
                <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                  <polygon points='4 3.5 0 0 0 7' />
                </svg>
              )}
              <span
                className={classNames({
                  'text-red-500 font-medium': cate._id === category
                })}
              >
                {cate.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* <button onClick={handleClickCate}>Click me</button> */}
      <Link to={''} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        {t("aside filter.filter search")}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div className=''>Khoảng giá</div>
        <form className='mt-2' onSubmit={handleSubmit(submitPrice)}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='đ Từ'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                />
              )}
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ Đến'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStar queryConfig={queryConfig} />

      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        className='w-full py-2 px-3 bg-gray-400 rounded-lg shadow-gray-500/50 text-white hover:shadow-gray-800/50 transition-all'
        onClick={handleRemoveAll}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
