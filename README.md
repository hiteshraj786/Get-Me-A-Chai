<p align="center">
  <img src="public/tea.gif" alt="Get Me a Chai Logo" width="120" height="120" />
</p>

<h1 align="center">☕ Get Me a Chai</h1>

<p align="center">
  <strong>A crowdfunding platform where fans can support their favorite creators — one chai at a time.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#environment-variables">Environment Variables</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Razorpay-Payment-blue?style=for-the-badge&logo=razorpay" alt="Razorpay" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/NextAuth-4-purple?style=for-the-badge" alt="NextAuth" />
</p>

---

## 📖 Overview

**Get Me a Chai** is a full-stack Patreon-style crowdfunding platform built with Next.js. It enables creators — developers, artists, writers, streamers, and anyone building something amazing — to receive direct financial support from their fans and community. Think of it as "Buy Me a Coffee" but with an Indian chai twist! ☕

Fans can visit a creator's personalized profile page, see their cover photo and avatar, and make instant payments via Razorpay. Each creator gets a unique public URL (`/username`), a dashboard to manage their profile and payment credentials, and a real-time supporter leaderboard.

---

## ✨ Features

### 🔐 Authentication System
- **GitHub OAuth Login** — Seamless one-click login powered by NextAuth.js with GitHub as the identity provider.
- **Auto User Creation** — New users are automatically registered in the database on first sign-in. The username is derived from the user's email prefix.
- **Session Management** — Secure session handling with NextAuth's `SessionProvider`, wrapping the entire application for global access to authentication state.
- **Protected Routes** — The Dashboard route is protected; unauthenticated users are automatically redirected to the Login page.
- **Multi-Provider UI** — Login page presents buttons for Google, LinkedIn, Twitter, Facebook, GitHub, and Apple. Currently, GitHub is the active provider; others show a "Coming Soon" toast notification.

### 👤 Creator Profiles (Dynamic Routes)
- **Personalized Public Pages** — Each creator gets a unique page at `/<username>` powered by Next.js dynamic routing (`[username]`).
- **Custom Cover & Profile Pictures** — Creators can set custom cover banners and profile avatars via URL, displayed on their public profile.
- **404 Handling** — If a username doesn't exist in the database, Next.js `notFound()` returns a proper 404 page.
- **Dynamic SEO Metadata** — Each creator's page generates unique `<title>` and `<meta description>` tags using `generateMetadata()`.

### 💰 Payment System (Razorpay Integration)
- **Razorpay Checkout** — Full integration with Razorpay's payment gateway using their JavaScript checkout SDK.
- **Per-Creator Payment Credentials** — Each creator configures their own Razorpay Key ID and Secret in their dashboard, meaning payments go directly to the creator's Razorpay account.
- **Server-Side Order Creation** — Orders are created on the server using Next.js Server Actions, ensuring the secret key never reaches the client.
- **Payment Verification** — After payment, Razorpay sends a callback to `/api/razorpay`, where the server verifies the payment signature cryptographically using `validatePaymentVerification`.
- **Payment Status Tracking** — Payments are initially stored with `done: false` and updated to `done: true` only after successful signature verification.
- **Preset Amounts** — Quick-pay buttons for ₹1000, ₹2000, and ₹5000, or enter a custom amount.
- **Form Validation** — The Pay button is disabled until the name (≥ 2 chars), message (≥ 3 chars), and amount fields are properly filled.
- **Success Notification** — After a successful payment, the user is redirected back to the creator's page with a toast notification saying "Thanks for your donation!".

### 📊 Creator Dashboard
- **Profile Management** — Creators can update their Name, Email, Username, Profile Picture URL, Cover Picture URL, Razorpay Key ID, and Razorpay Secret.
- **Floating Label Inputs** — Beautiful form with floating labels that animate on focus using CSS peer selectors.
- **Username Uniqueness Check** — Before updating, the server checks if the new username is already taken.
- **Linked Payment Records** — When a creator changes their username, all existing payment records (`to_user` field) are automatically updated across the database.
- **Session Refresh** — After profile update, the NextAuth session is refreshed to reflect the new username everywhere.
- **Toast Notifications** — Success/error feedback via `react-toastify` with animated bounce transitions.

### 🏆 Supporter Leaderboard
- **Top 10 Supporters** — Each creator's public page shows the top 10 supporters ranked by donation amount.
- **Supporter Details** — Each entry shows the supporter's name, donation amount (₹), and their personalized message.
- **Animated Avatars** — Each supporter entry features an animated GIF avatar.
- **Real-Time Stats** — Displays total number of supporters and total amount raised on the creator's page.

### 🎨 UI/UX Design
- **Dark Theme** — Sleek dark background with a starfield-like radial gradient dot pattern (`radial-gradient(#ffffff33 1px, #00091d 1px)`).
- **Gradient Buttons** — Purple-to-blue gradient buttons with hover effects that reverse the gradient direction.
- **Glassmorphism Effects** — Dashboard form uses semi-transparent background with `bg-white/3`, `backdrop-blur`, and subtle border for a modern glass effect.
- **Animated GIFs** — Tea, coin, man, and group GIF animations on the homepage to create visual engagement.
- **Responsive Navigation** — Navbar adapts from horizontal desktop layout to vertical mobile layout.
- **User Dropdown Menu** — Authenticated users see a dropdown menu with Dashboard, Your Page, and Sign Out options. The dropdown closes when clicking outside (via `useRef` + `useEffect` click-outside detection).
- **Dynamic Copyright** — Footer automatically displays the current year.

### 📱 Responsive Design
The entire application is fully responsive across all breakpoints:

| Feature | Mobile | Tablet | Desktop |
|---|---|---|---|
| **Navbar** | Vertical stack with centered logo | Adaptive | Horizontal with side-by-side elements |
| **Hero Section** | Smaller text (`text-2xl`), centered, with padding | — | Larger text (`text-5xl`) |
| **Feature Cards** | Full-width stacked | — | 3-column flex layout with `30%` width |
| **Cover Image** | `h-40` height | `h-64` height | `h-96` full height |
| **Profile Avatar** | `80x80px` with `-bottom-10` offset | `112x112px` | `130x130px` with `-bottom-20` offset |
| **Payment Section** | Single column stacked | — | Two-column side-by-side layout |
| **Dashboard Form** | Full-width | — | `max-w-1/2` centered |
| **YouTube Embed** | Responsive `aspect-video` | Responsive | Full `max-w-3xl` |

### 🔔 Toast Notification System
- **React-Toastify** integration for non-intrusive feedback across the app.
- Positioned top-right with 5-second auto-close.
- Bounce transition animation.
- Used for payment success, profile updates, and "Coming Soon" alerts.

### 🌐 SEO
- **Dynamic Metadata** — `generateMetadata()` for creator pages generates unique titles and descriptions.
- **Static Metadata** — Dashboard and About pages export static metadata objects.
- **Root Layout Metadata** — Default title "Get me a Chai - Fund your projects with chai" and description set in the root layout.
- **Semantic HTML** — Proper use of `<nav>`, `<main>`, headings hierarchy, and semantic elements.
- **Google Fonts** — Optimized font loading with `next/font/google` for Geist and Geist Mono.

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.10 | Full-stack React framework with SSR, API routes, Server Actions |
| **UI Library** | React | 19.2.4 | Component-based UI |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework |
| **PostCSS** | @tailwindcss/postcss | 4.x | CSS processing pipeline |
| **Authentication** | NextAuth.js | 4.24.14 | OAuth authentication (GitHub provider) |
| **Database** | MongoDB | via Mongoose 9.7.4 | NoSQL document database |
| **ODM** | Mongoose | 9.7.4 | MongoDB object modeling |
| **Payments** | Razorpay | 2.9.6 | Payment gateway integration |
| **Notifications** | react-toastify | 11.1.0 | Toast notification system |
| **Environment** | dotenv | 17.4.2 | Environment variable management |
| **Linting** | ESLint + eslint-config-next | 9.x | Code quality |
| **Fonts** | Geist & Geist Mono | via next/font | Typography |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                    │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌─────────┐ │
│  │ Homepage │  │  Login   │  │ Dashboard │  │ /[user] │ │
│  │ (SSR)    │  │ (Client) │  │ (Client)  │  │ (SSR)   │ │
│  └─────────┘  └──────────┘  └───────────┘  └─────────┘ │
│                       │                         │        │
│               NextAuth Session            Razorpay SDK   │
└──────────────────────┬──────────────────────┬───────────┘
                       │                      │
┌──────────────────────┴──────────────────────┴───────────┐
│                    NEXT.JS SERVER                        │
│  ┌──────────────────┐  ┌────────────────────────┐       │
│  │   Server Actions  │  │      API Routes        │       │
│  │  • initiate()     │  │  • /api/auth/[...next] │       │
│  │  • fetchuser()    │  │  • /api/razorpay       │       │
│  │  • fetchpayments()│  │    (Payment Callback)  │       │
│  │  • updateProfile()│  └────────────────────────┘       │
│  └──────────────────┘                                    │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────┐
│                    MongoDB (Mongoose)                     │
│  ┌─────────────────┐        ┌──────────────────────┐     │
│  │   Users          │        │     Payments          │     │
│  │  • email         │        │  • name               │     │
│  │  • username      │        │  • to_user            │     │
│  │  • name          │        │  • oid (Razorpay ID)  │     │
│  │  • profilepic    │        │  • message            │     │
│  │  • coverpic      │        │  • amount             │     │
│  │  • razorpayId    │        │  • done (Boolean)     │     │
│  │  • razorpaySecret│        │  • createdAt          │     │
│  │  • createdAt     │        │  • updatedAt          │     │
│  │  • updatedAt     │        └──────────────────────┘     │
│  └─────────────────┘                                      │
└──────────────────────────────────────────────────────────┘
```

### Payment Flow

```
Fan fills form ──► Server Action creates Razorpay Order ──► Razorpay Checkout opens
       │                                                              │
       │                  Payment record saved (done: false)          │
       │                                                              │
       │              Fan completes payment on Razorpay               │
       │                                                              ▼
       │                              Razorpay sends callback to /api/razorpay
       │                                          │
       │                              Server verifies signature
       │                                          │
       │                              Payment marked done: true
       │                                          │
       └──────────── Redirect to /<username>?paymentdone=true
                                Toast: "Thanks for your donation!"
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** — v18.0 or higher
- **npm** — v9.0 or higher (comes with Node.js)
- **MongoDB** — Running locally on `localhost:27017` or a MongoDB Atlas cloud instance
- **Git** — For cloning the repository

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hiteshraj786/Get-Me-A-Chai.git
   cd Get-Me-A-Chai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # GitHub OAuth (NextAuth)
   GITHUB_ID=your_github_oauth_app_client_id
   GITHUB_SECRET=your_github_oauth_app_client_secret

   # Razorpay (Platform-level keys, optional)
   KEY_ID=your_razorpay_key_id
   KEY_SECRET=your_razorpay_key_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/chai

   # App URL
   NEXT_PUBLIC_URL=http://localhost:3000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_random_secret_string_here
   ```

4. **Start MongoDB**

   Make sure MongoDB is running locally:

   ```bash
   mongod
   ```

   Or if you're using MongoDB Atlas, update the `MONGODB_URI` in `.env.local` with your connection string, and also update `db/connectDB.js` to use `process.env.MONGODB_URI`.

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open in browser**

   Visit [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables

| Variable | Description | Required | Public |
|---|---|---|---|
| `GITHUB_ID` | GitHub OAuth App Client ID | ✅ | ❌ |
| `GITHUB_SECRET` | GitHub OAuth App Client Secret | ✅ | ❌ |
| `KEY_ID` | Razorpay Key ID (platform-level) | ⚠️ Optional | ❌ |
| `KEY_SECRET` | Razorpay Key Secret (platform-level) | ⚠️ Optional | ❌ |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Key ID (exposed to client for checkout) | ✅ | ✅ |
| `MONGODB_URI` | MongoDB connection string | ✅ | ❌ |
| `NEXT_PUBLIC_URL` | Base URL of the application | ✅ | ✅ |
| `NEXTAUTH_URL` | NextAuth base URL (must match app URL) | ✅ | ❌ |
| `NEXTAUTH_SECRET` | Secret for signing NextAuth JWT tokens | ✅ | ❌ |

### Setting up GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Set **Homepage URL** to `http://localhost:3000`
4. Set **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`
5. Copy the **Client ID** and **Client Secret** into your `.env.local`

### Setting up Razorpay

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings → API Keys**
3. Generate a new key pair
4. Copy the **Key ID** and **Key Secret** into your `.env.local`
5. Each creator will also need to enter their own Razorpay credentials in the Dashboard

---

## 📁 Project Structure

```
get-me-a-chai/
├── actions/
│   └── useractions.js          # Server Actions (initiate, fetchuser, fetchpayments, updateProfile)
│
├── app/
│   ├── [username]/
│   │   └── page.js             # Dynamic creator profile page (SSR)
│   ├── about/
│   │   └── page.js             # About page (static)
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.js    # NextAuth configuration & GitHub OAuth
│   │   └── razorpay/
│   │       └── route.js        # Razorpay payment verification webhook
│   ├── dashboard/
│   │   └── page.js             # Dashboard page wrapper
│   ├── login/
│   │   └── page.js             # Login page with social auth buttons
│   ├── favicon.ico             # App favicon
│   ├── globals.css             # Global styles (Tailwind import + custom classes)
│   ├── layout.js               # Root layout (Navbar, Footer, SessionProvider, Toasts)
│   └── page.js                 # Homepage / Landing page
│
├── components/
│   ├── Dashboard.js            # Dashboard form component (profile management)
│   ├── Footer.js               # Footer with dynamic copyright year
│   ├── Navbar.js               # Navigation bar with auth-aware UI & dropdown
│   ├── PaymentPage.js          # Creator payment page with Razorpay checkout
│   └── SessionWrapper.js       # NextAuth SessionProvider wrapper
│
├── db/
│   └── connectDB.js            # MongoDB connection utility (singleton pattern)
│
├── models/
│   ├── Payment.js              # Mongoose Payment schema
│   └── User.js                 # Mongoose User schema
│
├── public/
│   ├── avatar.gif              # Default supporter avatar
│   ├── coin.gif                # Coin animation (feature card)
│   ├── group.gif               # Community animation (feature card)
│   ├── man.gif                 # Person animation (feature card)
│   └── tea.gif                 # Tea/Chai animation (logo & branding)
│
├── .env.local                  # Environment variables (not committed)
├── .gitignore                  # Git ignore rules
├── eslint.config.mjs           # ESLint configuration
├── jsconfig.json               # JavaScript path aliases (@/)
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration for Tailwind
└── README.md                   # This file
```

---

## 📄 Pages & Routes

| Route | Type | Auth Required | Description |
|---|---|---|---|
| `/` | SSR | ❌ | Landing page with hero section, feature cards, and embedded YouTube video |
| `/login` | CSR | ❌ | Login page with multiple social auth buttons (GitHub active) |
| `/dashboard` | CSR | ✅ | Creator dashboard to manage profile and Razorpay credentials |
| `/about` | SSR | ❌ | About page describing the platform, benefits, and community |
| `/<username>` | SSR | ❌ | Public creator profile with payment form and supporter leaderboard |
| `/api/auth/[...nextauth]` | API | — | NextAuth authentication endpoints |
| `/api/razorpay` | API | — | Razorpay payment verification callback |

---

## 🗄️ Database Schema

### User Collection

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | String | ✅ | User's email (from GitHub OAuth) |
| `username` | String | ✅ | Unique username (default: email prefix) |
| `name` | String | ❌ | Display name |
| `profilepic` | String | ❌ | URL to profile picture |
| `coverpic` | String | ❌ | URL to cover banner image |
| `razorpayId` | String | ❌ | Creator's Razorpay Key ID |
| `razorpaySecret` | String | ❌ | Creator's Razorpay Key Secret |
| `createdAt` | Date | Auto | Account creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Payment Collection

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | ✅ | Supporter's name |
| `to_user` | String | ✅ | Username of the creator receiving payment |
| `oid` | String | ✅ | Razorpay Order ID |
| `message` | String | ❌ | Supporter's message |
| `amount` | Number | ✅ | Payment amount in INR |
| `done` | Boolean | Auto | Payment verification status (default: `false`) |
| `createdAt` | Date | Auto | Payment creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Set Environment Variables** in Vercel Dashboard:
   - Add all variables from `.env.local`
   - Update `NEXT_PUBLIC_URL` and `NEXTAUTH_URL` to your Vercel domain (e.g., `https://get-me-a-chai.vercel.app`)
   - Update GitHub OAuth callback URL to `https://your-domain.vercel.app/api/auth/callback/github`

4. **Database** — Use [MongoDB Atlas](https://www.mongodb.com/atlas) for production:
   - Create a free M0 cluster
   - Whitelist Vercel's IP (or use `0.0.0.0/0` for all IPs)
   - Update `MONGODB_URI` in Vercel with the Atlas connection string
   - Update `db/connectDB.js` to use `process.env.MONGODB_URI` instead of hardcoded localhost

5. **Deploy** — Vercel automatically builds and deploys on every push

### Deploy on Other Platforms

<details>
<summary><strong>Railway</strong></summary>

1. Connect your GitHub repo on [railway.app](https://railway.app)
2. Add a MongoDB plugin or use MongoDB Atlas
3. Set all environment variables
4. Railway auto-detects Next.js and deploys

</details>

<details>
<summary><strong>Render</strong></summary>

1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repo
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables
6. Use MongoDB Atlas for database

</details>

<details>
<summary><strong>Self-Hosted (VPS)</strong></summary>

```bash
# Clone and install
git clone https://github.com/hiteshraj786/Get-Me-A-Chai.git
cd Get-Me-A-Chai
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local with your production values

# Build and start
npm run build
npm start
# App runs on port 3000 by default

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "get-me-a-chai" -- start
pm2 save
pm2 startup
```

Use **Nginx** as a reverse proxy:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

</details>

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contribution

- 🔌 Add Google, Twitter, and Facebook OAuth providers
- 💳 Add Stripe as an alternative payment gateway
- 📧 Email notifications for new supporters
- 📊 Analytics dashboard for creators
- 🎨 Theme customization for creator profiles
- 🔍 Search functionality to discover creators
- 📱 Progressive Web App (PWA) support
- 🧪 Add unit and integration tests

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) — The React Framework for Production
- [Razorpay](https://razorpay.com/) — Payment Gateway for India
- [NextAuth.js](https://next-auth.js.org/) — Authentication for Next.js
- [MongoDB](https://www.mongodb.com/) — NoSQL Database
- [Tailwind CSS](https://tailwindcss.com/) — Utility-First CSS Framework
- [React-Toastify](https://fkhadra.github.io/react-toastify/) — Toast Notifications
- [Vercel](https://vercel.com/) — Deployment Platform

---

<p align="center">
  Made with ❤️ and ☕ by <a href="https://github.com/hiteshraj786">Hitesh Raj</a>
</p>
