import { Model } from 'mongoose'
import { PagingDataProps } from '../helper/response-handler'

export interface SearchFilterProps<T> {
  filter: T
  page: number
  pageSize: number
}

export interface SearchResultProps {
  data: PagingDataProps<any> | null
}
