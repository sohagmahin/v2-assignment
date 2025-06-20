⚠️ **Image Disclaimer**: The application uses placeholder images from jsonplaceholder.typicode.com. These images may not load due to their service unavailability. 📸


# V2 Assignment Project (Albums and Blogs)

A modern web application built with Next.js 15.

## Live Demo

🔗 [View Live Demo](https://v2-assignment-tau.vercel.app)

## Project Overview

This is a Next.js 15+ application that leverages the App Router architecture. The project is built with TypeScript for type safety and includes modern development practices and tools.

## Project Structure

```
├── app/             # Next.js App Router pages and layouts
├── components/      # Reusable React components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and shared code
├── public/         # Static assets
└── types/          # TypeScript type definitions
```

## Features

- **Album Management**
  - Grid view of albums with thumbnails
  - Infinite scroll for albums
  - Modal-based album details view
  - Responsive album display

- **Blog System**
  - Blog posts with rich content
  - Infinite scroll for blog posts
  - Show comments for each blog post

- **UI/UX**
  - Clean and minimal design
  - Responsive layout

- **Performance**
  - Optimized loading times
  - API caching by swr


## Tech Stack

- **Frontend**: Next.js 15, TypeScript, swr
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js >= 20
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Running the Application

```bash
# Start development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`
