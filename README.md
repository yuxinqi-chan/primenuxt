# PrimeNuxt

A modern, high-performance open-source blogging system built with PrimeVue and Nuxt.js, deployed on Cloudflare Pages.

## Key Features

- Built with Vue 3 and Nuxt 3 for excellent developer experience and performance
- Integrated PrimeVue component library for a beautiful, responsive user interface
- Deployed on Cloudflare Pages for fast global access and high availability

## Tech Stack

- Frontend Framework: Vue 3 & Nuxt 3
- UI Components: PrimeVue
- Database: Cloudflare D1
- Hosting: Cloudflare Pages

## Getting Started

Clone the repository:

```bash
git clone https://github.com/yuxinqi-chan/primenuxt.git
```

Install dependencies:

```bash
npm install
```

Copy `wrangler.toml.example` to `wrangler.toml`.

Initialize the database:

```bash
npm run init
```

Run the development server:

```bash
npm run dev
```

Deploy the application with wrangler or Cloudflare Pages Web UI:

Binddings:

- D1: `DB`
- KV: `KV`
- R2: `MEDIA_BUCKET`
- ENV:
  - `MEDIA_BUCKET_PUBLIC_URL` if you want to use a custom domain for the media bucket

```bash
npm run deploy
```

## Contributing

Issues and pull requests are welcome!
