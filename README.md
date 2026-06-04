# chatbox

Vite + React app set up for GitHub Pages deployment and a local embeddable chatbot demo.

## Run locally

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run build
```

## Chat widget demo

- Widget iframe: `/widget.html`
- Widget CSS: `/widget.css`
- Widget iframe script: `/widget-iframe.js`
- Loader script: `/widget-loader.js`
- Host demo page: `/host-nh.html`

## GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-gh-pages.yml`.

It builds `dist/` and publishes to `gh-pages` when you push to `main`.

If you want to embed the chatbot on another page, use:

```html
<nh-chatbot 
	bot-id="bot-Elyl0dm" 
	public-key="BcxHOn3wssd0k9QaD1PdcX5FFEY9bI"
	lang="vi">
</nh-chatbot>

<script src="https://chatbot-lib.web4s.vn/nh-chatbot.iife.js" defer></script>
```

