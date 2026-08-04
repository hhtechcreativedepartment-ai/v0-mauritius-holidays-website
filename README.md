# v0-mauritius-holidays-website

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_y5yLfSFGcAawy5Is90VSkIRqW6hk)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/hhtechcreativedepartment-ai/v0-mauritius-holidays-website" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>

# Mauritius Holidays Website

This is a production-ready Next.js application written in TypeScript and run
with Node.js. TypeScript is compiled automatically during `npm run build`.

## Local development

```bash
npm install
npm run dev
```

## Node.js hosting / cPanel deployment

Use these application settings in the hosting control panel:

- Node.js version: 20.9 or newer (Node.js 22 LTS recommended)
- Application mode: Production
- Application root: the directory containing `package.json`
- Startup file: `app.js`
- Install command: `npm install`
- Build command: `npm run build`
- Environment variable: `NODE_ENV=production`

After uploading the project, run:

```bash
npm install
npm run build
npm start
```

The hosting provider normally supplies the `PORT` environment variable. The
server listens on that port automatically and binds to `0.0.0.0` by default.

Do not upload the local `node_modules` or `.next` directories. Install packages
and run the production build on the hosting server instead.
