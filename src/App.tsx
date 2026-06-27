import { useEffect, useMemo, useState } from "react";
import productsData from "../products.json";
import { Controls } from "./components/AppControls";
import { EmptyState } from "./components/EmptyState";
import { WhatsAppIcon } from "./components/Icons";
import { ProductCard } from "./components/ProductCard";
import type { Product, ProductType, SortOption } from "./types";
import { compareProductTypes } from "./utils/productType";

const products = productsData as Product[];
const availableTypes = Array.from(
  new Set(products.map((product) => product.type)),
).sort(compareProductTypes) as ProductType[];

function App() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<ProductType | "all">("all");
  const [sort, setSort] = useState<SortOption>("name");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("product-search")?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    let ticking = false;
    let previousScrolledState = window.scrollY > 50;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const nextScrolledState = window.scrollY > 50;

        if (nextScrolledState !== previousScrolledState) {
          previousScrolledState = nextScrolledState;
          setIsScrolled(nextScrolledState);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return products
      .filter((product) => {
        const matchesType = activeType === "all" || product.type === activeType;
        const matchesQuery =
          !normalizedQuery ||
          product.name.toLocaleLowerCase().includes(normalizedQuery) ||
          product.description.toLocaleLowerCase().includes(normalizedQuery);

        return matchesType && matchesQuery;
      })
      .sort((a, b) => {
        if (sort === "has-link") {
          const linkDifference =
            Number(Boolean(b.link)) - Number(Boolean(a.link));
          return linkDifference || a.name.localeCompare(b.name);
        }

        return sort === "type"
          ? a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
          : a.name.localeCompare(b.name);
      });
  }, [activeType, query, sort]);

  const hasActiveFilters = query.length > 0 || activeType !== "all";
  const countLabel = hasActiveFilters
    ? `${visibleProducts.length} ${
        visibleProducts.length === 1 ? "product" : "products"
      } found`
    : `${products.length} products shipped`;

  const resetFilters = () => {
    setQuery("");
    setActiveType("all");
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(
      ".reveal:not(.visible), .reveal-scale:not(.visible)",
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleProducts]);

  return (
    <div className="site-shell">
      <header className={`site-header${isScrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          <div className="brand" aria-label="ShipKaro">
            <span className="brand-name">shipkaro</span>
            <span className="enter-key" aria-hidden="true">
              ↵
            </span>
          </div>
          <nav aria-label="Main navigation">
            <span className="nav-item">Home</span>
            <span className="nav-item">Build</span>
            <span className="nav-item events-link">
              Events <span aria-hidden="true" />
            </span>
            <span className="nav-item">Newsletter</span>
            <a
              className="community-link"
              href="https://shipkaro.dev/community"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon width="16" height="16" />
              Join Community
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="directory-pill reveal">
                <span aria-hidden="true" />
                Community directory · live
              </p>
              <h1 className="reveal reveal-delay-1" id="page-title">
                What the ShipKaro
                <br />
                community has <em>shipped.</em>
              </h1>
              <p className="hero-description reveal reveal-delay-2">
                Real products from real makers — Android apps, iOS apps, web
                apps, AI tools, automations and extensions. All built by people
                who chose to ship.
              </p>

              <div
                className="hero-stats reveal reveal-delay-3"
                aria-label="Directory statistics"
              >
                <div>
                  <strong>{products.length}</strong>
                  <span>Products shipped</span>
                </div>
                <div>
                  <strong>{availableTypes.length}</strong>
                  <span>Categories</span>
                </div>
              </div>
            </div>

            <div className="hero-visual reveal-scale">
              <img
                className="hero-banner"
                src="/hero_image.webp"
                alt="ShipKaro Shipped — Built by Makers. Shipped for Real."
                width="1722"
                height="910"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section
          className="directory-section"
          id="products"
          aria-labelledby="directory-title"
        >
          <h2 className="sr-only" id="directory-title">
            Shipped products
          </h2>

          <Controls
            query={query}
            onQueryChange={setQuery}
            activeType={activeType}
            types={availableTypes}
            onTypeChange={setActiveType}
            sort={sort}
            onSortChange={setSort}
          />
          <p className="results-count" aria-live="polite">
            {countLabel}
          </p>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </section>

        <section className="closing-cta">
          <div className="closing-inner">
            <p className="closing-eyebrow reveal">/ ready when you are</p>
            <h2 className="reveal reveal-delay-1">
              The next product on this wall
              <br />
              could be <em>yours.</em>
            </h2>
            <p className="closing-copy reveal reveal-delay-2">
              Join the WhatsApp community. See what makers are building,
              share what you ship, and keep your momentum moving.
            </p>
            <a
              className="reveal reveal-delay-3"
              href="https://shipkaro.dev/community"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon width="20" height="20" />
              Join shipkaro Community
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-about">
              <span className="footer-mark" aria-hidden="true">↵</span>
              <p>
                Pakistan&apos;s home for indie makers who ship. Stop
                perfecting. Start shipping.
              </p>
            </div>

            <div className="footer-column">
              <h3>Products</h3>
              <span>1DayApp Cohort</span>
              <span>MyDiary AI</span>
              <span>Events &amp; Meetups</span>
            </div>

            <div className="footer-column">
              <h3>Resources</h3>
              <span>ShipKaro Weekly</span>
              <span>Developer Portfolios</span>
              <span>Shipped Apps</span>
            </div>

            <div className="footer-column">
              <h3>Community</h3>
              <span>WhatsApp</span>
              <span>About Wajahat</span>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 ShipKaro · A RemoteKaro LLC project</p>
            <div className="footer-socials" aria-label="Social links">
              <span aria-label="LinkedIn">in</span>
              <span aria-label="X">X</span>
              <span aria-label="YouTube">▶</span>
              <span aria-label="GitHub">GH</span>
              <span aria-label="Discord">D</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
