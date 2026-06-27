import type { ProductType, SortOption } from '../types'
import {
  SearchBar,
  SortSelect,
  TypeFilter,
  type ActiveType,
} from './Controls'

interface ControlsProps {
  query: string
  onQueryChange: (value: string) => void
  activeType: ActiveType
  types: ProductType[]
  onTypeChange: (type: ActiveType) => void
  sort: SortOption
  onSortChange: (sort: SortOption) => void
}

export function Controls({
  query,
  onQueryChange,
  activeType,
  types,
  onTypeChange,
  sort,
  onSortChange,
}: ControlsProps) {
  return (
    <div className="controls-panel">
      <div className="controls-primary">
        <SearchBar value={query} onChange={onQueryChange} />
        <SortSelect value={sort} onChange={onSortChange} />
      </div>
      <TypeFilter
        activeType={activeType}
        types={types}
        onChange={onTypeChange}
      />
    </div>
  )
}
