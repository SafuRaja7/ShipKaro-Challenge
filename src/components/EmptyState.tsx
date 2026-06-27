import { SearchIcon } from './Icons'

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <SearchIcon width="28" height="28" />
      </span>
      <p className="eyebrow">Nothing here—yet</p>
      <h2>No products matched that search.</h2>
      <p>Try another keyword or reset your filters to see every ship.</p>
      <button type="button" onClick={onReset}>
        Show all products
      </button>
    </div>
  )
}
