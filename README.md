# CodeGate Dashboard

[![Coverage Status](https://coveralls.io/repos/github/stacklok/codegate-ui/badge.svg?branch=main)](https://coveralls.io/github/stacklok/codegate-ui?branch=main)

This repository contains the [CodeGate](https://github.com/stacklok/codegate)
dashboard user interface. The dashboard presents information about CodeGate's
security insights and activity, including:

- Prompt and chat conversation history
- Security alert counts and daily trend
- Alert history with secrets and package risks detected by CodeGate
- CA certificate download and installation instructions

## Setting up local development environment

To run a local development environment, start by running a copy of the CodeGate
[application](https://github.com/stacklok/codegate/blob/main/docs/development.md)
or [container](https://docs.codegate.ai/how-to/install). The UI will connect to
the API endpoint at `http://localhost:8989` by default. To change this, set the
`VITE_BASE_API_URL` environment variable.

Install all dependencies and run a dev server:

```bash
npm install
```

## Running the development server

Run the development server using:

```bash
npm run dev
```

Open <http://localhost:5173> on your browser to see the dashboard

## Build production

Run the build command:

```bash
npm run build
```

## Running production build

Run the production build command:

```bash
npm run preview
```

## Custom SVG icons

In order to generate custom SVG icons based on the Figma design, download the icon from Figma and place it
in the `icons/` folder.

Then run:

```bash
npm run generate-icons
```

## Update built-in prompt presets:

```bash
npm run fetch-prompt-presets
```
