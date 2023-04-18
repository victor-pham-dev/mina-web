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
async function Searcher<t>(
  schema: Model<any>,
  filter: t,
  page: number,
  pageSize: number,
): Promise<SearchResultProps> {
  try {
    const currentPage = (page - 1) * pageSize
    const query = await schema
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(currentPage)
      .limit(pageSize)
    const totalCount = await schema.find(filter).countDocuments()
    if (query && totalCount) {
      return {
        data: {
          dataTable: query,
          paging: {
            page: page,
            pageSize: pageSize,
          },
          totalCount: totalCount,
        },
      }
    } else {
      return {
        data: {
          dataTable: [],
          paging: {
            page: 1,
            pageSize: 1,
          },
          totalCount: 0,
        },
      }
    }
  } catch (error: any) {
    throw new Error(`common search error:  ${error}`)
  }
}

export { Searcher }
