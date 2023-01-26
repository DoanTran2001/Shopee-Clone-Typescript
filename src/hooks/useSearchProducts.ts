import omit  from 'lodash/omit'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/utils/constants'
import useQueryConfig from './useQueryConfig'

function useSearchProducts() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: ''
    }
  })
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const onSubmitSearch = handleSubmit((data) => {
    // console.log(data);
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.name }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return {
    onSubmitSearch, register
  }
}

export default useSearchProducts
