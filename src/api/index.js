import { fetchDirections } from './directions.api'
import { fetchFilters } from './filters.api'

const fetchAll = () => {
  return {
    directions: fetchDirections(),
    filters: fetchFilters(),
  }
}

export default fetchAll
