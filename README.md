# 🛍️ Mini Commerce

Mini Commerce is a feature-rich e-commerce frontend built with **Next.js 14**, **Tailwind CSS v4**, and **ShadCN UI**. It provides a smooth shopping experience with search, product details, cart management, and checkout flow. Built as part of a technical assessment.

---

## ✨ Design Approach

The goal was to create a modern, user-friendly e-commerce interface with a clean and responsive layout. Key decisions include:

- **Component-Driven Development:** Used modular and reusable UI components via ShadCN.
- **State Management:** Leveraged Zustand (`/store/cart`) for lightweight global cart state.
- **Styling:** Applied Tailwind CSS v4 with a monochrome theme which can be extended to use custom themes and utility-first styling.
- **Animations:** Used Framer Motion for smooth interactions, including cart transitions and page fades.
- **Accessibility & UX:** Included empty-state messaging, loading skeletons, undo toasts, and keyboard-friendly controls.
- **SEO Consideration:** Embedded structured data and dynamic Open Graph metadata for shareability and visibility.

---

## 🚀 Features

- Product listing with search (Search is carried out on the frontend)
- Add to cart with quantity control & undo
- Checkout summary & confirmation
- Theme toggle (light/dark/system)
- Open Graph meta & structured data (JSON-LD)
- Image optimization using `next/image`
- Custom 404 page
- One unit test with Jest + React Testing Library

---

## 🛠️ Error Handling

- **User Feedback:** Uses toast notifications (`sonner`) to notify users of key actions (e.g., adding/removing items).
- **Async Handling:** Product fetch errors are gracefully handled with fallback UI (`Failed to load products` message).
- **Hydration Checks:** Zustand cart store uses a `hydrated` flag to prevent mismatches between SSR and client render.
- **404 & Fallback Routes:** Custom `not-found.tsx` page displays when a product slug is invalid or missing.
- **Undo Support:** Undo feature in cart removal lets users quickly reverse accidental deletions.

---

## 🧱 Tech Stack

- **Next.js 14 (App Router)**
- **Tailwind CSS v4**
- **ShadCN UI**
- **React Query**, **Framer Motion**, **Sonner**, **Lodash**
- **Jest** & **React Testing Library**

---

## 📦 Installation

```bash
npm install
npm run dev
```

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

Test: `ProductCard` component tested with Jest + RTL.

---

## 🗂 Folder Structure

```
src/
├── app/                 # Pages & routing
├── components/          # UI components
├── lib/                 # Data fetcher
├── store/               # Global state (cart)
├── data/                # Dummy products
├── hooks/               # Products fetcher

```

---

## 🔍 SEO

- Dynamic metadata with `generateMetadata()`
- Open Graph image previews via `/api/og`
- Product schema using JSON-LD
- Optimized images with `next/image`

Built with ❤️ by **\[Samuel Adejinmi]**
