import isNil from 'lodash/isNil'
import get from 'lodash/get'
import filter from 'lodash/filter'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import isFunction from 'lodash/isFunction'
import forEach from 'lodash/forEach'

const queryParams = (params) => {
  const keys = Object.keys(params)
  const objs = map(
    filter(keys, (k) => params[k]),
    (it) => `${it}=${params[it]}`
  )
  return objs.join('&')
}

export { isNil, get, filter, map, findIndex, find, isFunction, queryParams, forEach }
