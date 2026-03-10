# Гайд по миграции: React → Next.js

## Что уже готово

- `app/page.tsx` — главная страница
- `app/layout.tsx` — корневой layout с метатегами
- `app/providers.tsx` — все провайдеры (QueryClient, Auth, Cart)
- `components/Header.tsx` — хедер (уже адаптирован)
- `components/HeroSection.tsx` — герой-блок (уже адаптирован)
- `components/Footer.tsx` — футер (уже адаптирован)

## Что нужно скопировать без изменений

Эти компоненты НЕ используют react-router-dom — копируй 1-в-1:
- `components/SupplierSection.tsx`
- `components/SearchSection.tsx` ← нужно заменить useNavigate
- `components/NewsSection.tsx`
- `components/FeaturesSection.tsx`
- `components/ProductsSection.tsx`
- `components/DeliverySection.tsx`
- `components/DeliveryCalculator.tsx`
- `components/WelcomeModal.tsx`
- `components/product/RecommendedProducts.tsx`
- `components/product/ProductBadges.tsx`
- `components/product/ProductQuickView.tsx`
- `components/ui/*` — все UI компоненты
- `contexts/AuthContext.tsx`
- `contexts/CartContext.tsx`

## Правило замен везде

| React (старое) | Next.js (новое) |
|---|---|
| `import { useNavigate } from 'react-router-dom'` | `import { useRouter } from 'next/navigation'` |
| `import { useLocation } from 'react-router-dom'` | `import { usePathname } from 'next/navigation'` |
| `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` |
| `const navigate = useNavigate()` | `const router = useRouter()` |
| `navigate('/path')` | `router.push('/path')` |
| `location.pathname` | `pathname` (из usePathname) |
| `<img src=... />` | `<Image src=... fill alt=... />` из next/image |

## Добавить 'use client' в любой файл где есть

- useState, useEffect, useRef
- onClick, onChange и другие обработчики событий
- useRouter, usePathname
- useContext

## Структура папок Next.js

```
app/
  page.tsx          ← /
  layout.tsx
  providers.tsx
  catalog/
    page.tsx        ← /catalog
    categories/
      page.tsx      ← /catalog/categories
  product/
    [id]/
      page.tsx      ← /product/:id
  company/
    [id]/
      page.tsx      ← /company/:id
  suppliers/
    page.tsx
  orders/
    page.tsx
  profile/
    page.tsx
    company/
      page.tsx
  login/
    page.tsx
  register/
    page.tsx
    supplier/
      page.tsx
    buyer/
      page.tsx
  news/
    page.tsx
    publish/
      page.tsx
  cart/
    page.tsx
  pricing/
    page.tsx
  about/
    page.tsx
  contacts/
    page.tsx
  help/
    page.tsx
  terms/
    page.tsx
  privacy/
    page.tsx
  not-found.tsx     ← 404

components/         ← все компоненты
contexts/           ← Auth, Cart
public/img/         ← статика (картинки)
```
