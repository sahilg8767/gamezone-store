# 🎮 GameZone Store - Immersive 3D Gaming E-commerce Platform

[![React 19](https://img.shields.io/badge/React-19.0-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite 8](https://img.shields.io/badge/Vite-8.0-646CFF.svg?logo=vite)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion 12](https://img.shields.io/badge/Framer_Motion-12.0-F107A3.svg?logo=framer)](https://www.framer.com/motion/)

GameZone Store is a next-generation e-commerce web application dedicated to gaming hardware, consoles, and releases. Built with a futuristic sci-fi dark aesthetic, it leverages advanced physics-less 3D rendering, custom user pointer micro-interactions, and modular React state architectures.

---

## 🌟 Interactive 3D & Advanced UX Features

### 🌌 1. Parallax 3D Hero Scene
*   Designed a interactive hero panel ([Hero3D.tsx](file:///D:/projects/gamezone-store/artifacts/gamezone-store/src/components/Hero3D.tsx)) using Framer Motion Springs and mouse coordinate transforms.
*   Features custom floating glowing spheres, rotating orbits, and vector-parallax glowing backgrounds that shift dynamically as the user moves their mouse.

### ✨ 2. Particle Field Nebula Backdrop
*   Renders a lightweight, high-performance canvas-based particle nebula backdrop ([ParticleField.tsx](file:///D:/projects/gamezone-store/artifacts/gamezone-store/src/components/ParticleField.tsx)) globally, simulating stardust floating in a dark sci-fi galaxy.
*   Optimized for 60 FPS mobile rendering using raw Canvas 2D contexts, bypassing heavy WebGL loads on low-end devices.

### 🎯 3. Interactive Custom 3D Cursor
*   Includes a sleek custom cursor ([Cursor3D.tsx](file:///D:/projects/gamezone-store/artifacts/gamezone-store/src/components/Cursor3D.tsx)) that trails the pointer with elastic spring physics.
*   Dynamically changes scale, opacity, and borders as users hover over buttons, links, or product cards.

### 🛒 4. Modular Context Store Managers
*   Maintains atomic state management using separate React Context providers:
    *   `CartContext` (quantity increments, total calculations, cart updates).
    *   `WishlistContext` (quick-add, listing highlights).
    *   `CompareContext` (product comparison matrices aligning technical specifications).
    *   `ThemeContext` (smooth transitions between neon-blue dark mode and violet light mode).

---

## 📂 Codebase Directory Map

```
gamezone-store/
├── src/
│   ├── types/               # Type schemas (Products, CartItem, CompareQueue)
│   ├── hooks/               # Custom lifecycle hooks
│   ├── context/             # App State managers (Theme, Cart, Wishlist, Compare)
│   ├── components/          # 3D visuals & shared UI elements
│   │   ├── Hero3D.tsx       # Framer Motion 3D Parallax scene
│   │   ├── Cursor3D.tsx     # Custom spring-trailing pointer
│   │   ├── ParticleField.tsx# Canvas-based particle stardust
│   │   ├── Navbar.tsx
│   │   └── ui/              # Radix UI primitives / Shadcn components
│   ├── pages/               # Views (Home, Catalog, Cart, Compare, Checkout)
│   │   ├── home.tsx         # Features hero canvas, best sellers, dynamic categories
│   │   ├── products.tsx     # Multi-faceted search filters & listings grid
│   │   ├── product-detail.tsx# Technical specs, carousel galleries, FBT bundles
│   │   ├── compare.tsx      # Multi-product spec comparison columns
│   │   └── checkout.tsx     # Transaction and delivery tracking forms
│   ├── App.tsx              # Main routing & global providers configuration
│   ├── main.tsx
│   └── index.css            # Base styles & custom scrollbars
├── tsconfig.json            # Strict TypeScript rules
├── vite.config.ts           # Bundler settings with Tailwind v4 plugin
└── components.json          # Shadcn component configuration rules
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation & Running Sandbox

1. Navigate to the project directory:
   ```bash
   cd D:/projects/gamezone-store/artifacts/gamezone-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```

4. Build the production package:
   ```bash
   npm run build
   ```
