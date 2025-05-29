# Media Project

This is the **Medeil Platform** project, built using **Next.js 15**, styled with **Tailwind CSS**, and leveraging **NextUI** for beautiful UI components.

Medeil is a modern social network platform enabling users to share posts, engage with content, and connect with communities in real-time. The platform is designed for performance, accessibility, and scalability.

## 🚀 Features

- ✅ Next.js 15
- 🎨 Tailwind CSS
- 🧩 NextUI components
- 🔐 .env support
- 🏗️ Simple project structure

---

## 🛠️ Installation

Make sure you have **Node.js (v18+)** and **npm** or **yarn/pnpm** installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vannsoklay/media-platform.git
   cd media-platform
   ```

2. **Install dependencies**:
   ```bash
   # Using npm
   npm install

   # Or using yarn
   yarn

   # Or using pnpm
   pnpm install
   ```

---

## 📦 Getting Started

To start the development server:

```bash
npm run dev
```

Then visit `http://localhost:3000` in your browser.

---

## 🌐 Environment Variables

Create a `.env.local` file in the root of the project:

```bash
cp .env.example .env.local
```

Fill in the required environment variables in `.env.local`.

Example:

```env
NEXT_PUBLIC_GETAWAY_API_V1=
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_BACKEND_UPLOAD_URL=
```

---

## 🎨 Styling with Tailwind CSS

Tailwind CSS is already configured. You can start using utility classes directly in your components.

Configuration file: `tailwind.config.js`

---

## 🧩 UI Components with NextUI

This project uses [NextUI](https://nextui.org/) for modern, accessible UI components.

Example usage:

```tsx
'use client';
import { Button } from '@nextui-org/react';

export default function HomePage() {
  return <Button color="primary">Hello NextUI</Button>;
}
```

---

## 📂 Project Structure

```
.
├── app/              # App directory (Next.js 15)
├── components/       # Shared components
├── public/           # Static assets
├── styles/           # Global and Tailwind CSS
├── .env.example      # Example env file
├── tailwind.config.js
└── next.config.js
```

---

## 🧪 Build for Production

```bash
npm run build
npm start
```

---

## 📄 License

[MIT](LICENSE)