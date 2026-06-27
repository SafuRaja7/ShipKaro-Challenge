import type { Product } from '../types'
import {
  formatProductType,
  getProductTypeColor,
} from '../utils/productType'
import { ArrowUpRight, PinIcon } from './Icons'

interface ProductCardProps {
  product: Product
  index: number
}

function ProductAvatar({ product }: { product: Product }) {
  const nameParts = product.name.trim().split(/\s+/).filter(Boolean)
  const initials = (() => {
    if (!nameParts[0]) return 'SK'

    if (nameParts.length > 1) {
      return /^[a-z0-9]/i.test(nameParts[1])
        ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase()
        : nameParts[0].charAt(0).toUpperCase()
    }

    return /^[a-z0-9]$/i.test(nameParts[0].charAt(1))
      ? nameParts[0].slice(0, 2).toUpperCase()
      : nameParts[0].charAt(0).toUpperCase()
  })()

  if (product.icon) {
    return (
      <img
        className="product-avatar"
        src={product.icon}
        alt=""
        width="52"
        height="52"
        loading="lazy"
      />
    )
  }

  return (
    <span className="product-avatar avatar-fallback" aria-hidden="true">
      {initials}
    </span>
  )
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article
      className="product-card"
      style={{ '--card-index': Math.min(index, 11) } as React.CSSProperties}
    >
      <div className="card-topline">
        <ProductAvatar product={product} />
        <span
          className="type-badge"
          style={
            {
              '--type-color': getProductTypeColor(product.type),
            } as React.CSSProperties
          }
        >
          <span className="type-dot" />
          {formatProductType(product.type)}
        </span>
      </div>

      <div className="card-copy">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>

      <footer className="card-footer">
        <div className="builder">
          <span className="builder-avatar" aria-hidden="true">
            {product.builder.charAt(0).toUpperCase()}
          </span>
          <span>
            <small>Built by</small>
            <span className="builder-line">
              <strong>{product.builder}</strong>
              {product.city && (
                <span className="city">
                  <PinIcon width="13" height="13" />
                  {product.city}
                </span>
              )}
            </span>
          </span>
        </div>

        {product.link ? (
          <a
            className="visit-link"
            href={product.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${product.name} (opens in a new tab)`}
          >
            Visit
            <ArrowUpRight width="17" height="17" />
          </a>
        ) : (
          <span className="link-unavailable">Coming soon</span>
        )}
      </footer>
    </article>
  )
}
