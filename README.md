# 🦷 BrightSmile Dental Clinic Website

A complete, production-ready dental clinic website built with **Next.js 14**, **Tailwind CSS**, and **OpenAI** for AI-powered chat support.

![BrightSmile Preview](https://placehold.co/1200x630/0284c7/FFFFFF?text=BrightSmile+Dental+Clinic)

## ✨ Features

- **5 Full Pages** – Home, About, Services, Appointment Booking, Contact
- **AI Chat Assistant** – "Denty" powered by OpenAI GPT-4o-mini with smart fallback responses
- **Appointment Booking System** – Full form validation with email confirmation via Resend
- **Contact Form** – Validated form with auto-reply emails
- **Responsive Design** – Mobile-first with smooth animations
- **SEO Optimized** – Meta tags, Open Graph, structured HTML
- **Accessible** – ARIA roles, semantic HTML, keyboard navigation
- **TypeScript** – Full type safety throughout

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Framework    | Next.js 14 (App Router)        |
| Styling      | Tailwind CSS 3                 |
| Language     | TypeScript                     |
| Forms        | React Hook Form + Zod          |
| AI Chatbot   | OpenAI GPT-4o-mini             |
| Email        | Resend                         |
| Icons        | React Icons                    |
| Animations   | Framer Motion + CSS            |
| Deployment   | Vercel / Netlify / any Node.js host |

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dental-website.git
cd dental-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:

```env
# OpenAI – for the AI chatbot (get key at platform.openai.com)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Resend – for email sending (get free key at resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Clinic receiving email
CLINIC_EMAIL=info@yourclinicdomain.com

# Public site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note:** The site works without API keys — the chatbot uses smart fallback responses and forms log to the console in development mode.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
dental-website/
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout (Navbar, Footer, ChatBot)
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles + Tailwind
│   ├── not-found.tsx            # 404 page
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── services/
│   │   └── page.tsx             # Services page
│   ├── appointment/
│   │   └── page.tsx             # Appointment booking page
│   ├── contact/
│   │   └── page.tsx             # Contact page
│   └── api/
│       ├── chat/route.ts        # AI chatbot API endpoint
│       ├── appointment/route.ts # Appointment form API
│       └── contact/route.ts     # Contact form API
├── components/                  # Reusable components
│   ├── Navbar.tsx               # Sticky navbar with mobile menu
│   ├── Footer.tsx               # Footer with links & contact info
│   ├── ChatBot.tsx              # Floating AI chat widget
│   ├── HeroSection.tsx          # Homepage hero
│   ├── ServicesOverview.tsx     # Service cards grid
│   ├── WhyChooseUs.tsx          # Features section
│   ├── AboutPreview.tsx         # About preview on homepage
│   ├── Testimonials.tsx         # Patient review cards
│   ├── CTASection.tsx           # Call-to-action banner
│   ├── AppointmentForm.tsx      # Full booking form with validation
│   └── ContactForm.tsx          # Contact form with validation
├── public/                      # Static assets
│   └── favicon.ico
├── .env.example                 # Environment variable template
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind theme configuration
├── tsconfig.json                # TypeScript configuration
└── package.json
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in the Vercel dashboard:
   - `OPENAI_API_KEY`
   - `RESEND_API_KEY`
   - `CLINIC_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (set to your production domain)
4. Click **Deploy** — Vercel handles everything automatically

### Deploy to Netlify

1. Push to GitHub
2. Connect at [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Install the **Netlify Next.js plugin** (or use `@netlify/plugin-nextjs`)
6. Add environment variables in Netlify dashboard

### Deploy to a VPS / Server

```bash
npm run build
# Use PM2 or similar process manager
npm install -g pm2
pm2 start npm --name "dental-website" -- start
```

## ✏️ Customization Guide

### Change clinic information

1. **Name & branding** – Search for "BrightSmile" across the codebase and replace with your clinic name
2. **Contact details** – Update phone, email, and address in:
   - `components/Navbar.tsx`
   - `components/Footer.tsx`
   - `app/contact/page.tsx`
   - `app/api/chat/route.ts` (SYSTEM_PROMPT section)
3. **Colors** – Edit `tailwind.config.ts` → `colors.primary` and `colors.teal`
4. **Logo** – Replace the `FaTooth` icon in `Navbar.tsx` and `Footer.tsx` with an `<Image>` tag pointing to your logo

### Add real images

Replace placeholder divs in `HeroSection.tsx` and `AboutPreview.tsx` with:
```tsx
<Image src="/images/hero.jpg" alt="Clinic" fill className="object-cover" />
```

Place images in the `public/images/` directory.

### Update team profiles

Edit the `team` array in `app/about/page.tsx` with real dentist names, roles, photos, and credentials.

### Customize services and pricing

Edit the `services` array in `app/services/page.tsx` to match your actual service offerings and pricing.

### Google Maps

Replace the iframe `src` in `app/contact/page.tsx` with your clinic's Google Maps embed URL:
1. Go to [maps.google.com](https://maps.google.com)
2. Search for your clinic address
3. Click Share → Embed a map → Copy HTML → Extract the `src` URL

## 🔧 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Optional* | OpenAI API key for AI chatbot |
| `RESEND_API_KEY` | Optional* | Resend API key for email delivery |
| `CLINIC_EMAIL` | Recommended | Email that receives form submissions |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Production URL (for SEO meta tags) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Optional | Google Maps API key |

*If not provided, the chatbot uses intelligent fallback responses and forms log to the console.

## 📧 Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com) — free tier includes 3,000 emails/month
2. Verify your domain (or use `onboarding@resend.dev` for testing)
3. Copy your API key to `RESEND_API_KEY`

## 🤖 AI Chatbot Setup (OpenAI)

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Generate an API key
3. Add to `OPENAI_API_KEY`

The chatbot uses **GPT-4o-mini** which is very cost-effective (~$0.15 per 1M tokens).

## 🎨 Design System

Colors defined in `tailwind.config.ts`:
- **Primary** (blue): `primary-600` → `#0284c7`
- **Teal**: `teal-600` → `#0d9488`
- **Dark**: `dental-dark` → `#0c1a2e`

Reusable CSS classes in `globals.css`:
- `.btn-primary` / `.btn-secondary` / `.btn-teal`
- `.card` — white card with hover shadow
- `.form-input` / `.form-label`
- `.section-pad` / `.container-max`
- `.section-title` / `.section-subtitle`

## 📄 License

MIT License — free for personal and commercial use.

---

Built with ❤️ using Next.js, Tailwind CSS, and OpenAI.
