import { useEffect, useRef, useState } from 'react'
import type { ProductType, SortOption } from '../types'
import { formatProductType } from '../utils/productType'
import { CloseIcon, SearchIcon } from './Icons'

export type ActiveType = ProductType | 'all'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-wrap">
      <SearchIcon width="19" height="19" />
      <label className="sr-only" htmlFor="product-search">
        Search products
      </label>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name or description..."
        autoComplete="off"
      />
      {value && (
        <button
          className="clear-search"
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <CloseIcon width="16" height="16" />
        </button>
      )}
      <kbd>⌘ K</kbd>
    </div>
  )
}

interface TypeFilterProps {
  activeType: ActiveType
  types: ProductType[]
  onChange: (type: ActiveType) => void
}

export function TypeFilter({
  activeType,
  types,
  onChange,
}: TypeFilterProps) {
  return (
    <div className="filter-list" aria-label="Filter products by type">
      {(['all', ...types] as ActiveType[]).map((type) => (
        <button
          key={type}
          type="button"
          className={activeType === type ? 'active' : undefined}
          aria-pressed={activeType === type}
          onClick={() => onChange(type)}
        >
          {type === 'all' ? 'All' : formatProductType(type, true)}
        </button>
      ))}
    </div>
  )
}

interface SortSelectProps {
  value: SortOption
  onChange: (sort: SortOption) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const options: { value: SortOption; label: string }[] = [
    { value: 'name', label: 'Name A–Z' },
    { value: 'type', label: 'Product type' },
    { value: 'has-link', label: 'Has link' },
  ]
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? 'Name A–Z'

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <div className="sort-wrap" ref={containerRef}>
      <span className="sort-label">Sort</span>
      <button
        className="sort-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="sort-options"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{selectedLabel}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="m4 5.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="sort-menu" id="sort-options" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              className={value === option.value ? 'selected' : undefined}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              <span>{option.label}</span>
              {value === option.value && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
