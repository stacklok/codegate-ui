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

To install all dependencies for your local development environment (environment variable `VITE_BASE_API_URL="http://localhost:8989"` for API base url), run

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
