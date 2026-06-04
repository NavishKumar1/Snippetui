# SnippetUI

SnippetUI is a premium, interactive Web Components Library containing sleek, copy-paste CSS and JavaScript snippets to bring modern user interfaces to life. It features beautiful custom buttons, background animations, text animations, sliders, cards, and input fields.

## Features

- **Rich Visual Showcase**: Beautiful dark mode interface with neon gradients, glassmorphism, and smooth transitions.
- **Always-Visible Fullscreen Preview**: Test background animations and layouts at their true scale directly in the browser viewport.
- **High Performance**: Inertia smooth scrolling, scoped component script execution, and highly optimized hardware-accelerated CSS animations.
- **Copy-Paste Integration**: Instantly copy raw Tailwind classes, custom Vanilla CSS, standard JavaScript, and TypeScript setups.
- **CLI Support**: Add components directly to your workspace using standard package managers (npm, pnpm, yarn, bun).
- **VS Code Extension Integration**: Includes a modular VS Code extension configuration in `vscode-extension/` to search and insert snippets from your editor.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 20.19.0+ or 22.12.0+ recommended).

### Installation

1. Clone this repository (or download the source).
2. Install the dev dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the Vite development server and view the platform:
```bash
npm run dev
```

The terminal will display the local address (typically `http://localhost:5173/` or `http://localhost:5174/`).

## Project Structure

- `src/library/`: Scoped JS/CSS files for buttons, text animations, inputs, etc.
- `src/library.js`: Core library shell, handling state, filtering, copy events, and detailed previews.
- `src/style.css`: Global styling tokens, layout structures, and preview modal animation layers.
- `vscode-extension/`: Sources for the companion VS Code integration.

## License

This project is open-source and available under the **MIT License**.
