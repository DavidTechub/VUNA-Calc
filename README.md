# VUNA-Calc

![CI/CD Pipeline](https://github.com/YOUR_USERNAME/vuna-calc/actions/workflows/ci-cd.yml/badge.svg)

A production-ready calculator with full CI/CD pipeline.

## Features
- Basic arithmetic: +, −, ×, ÷
- Custom features: Percentage (%), Square (x²)
- AC (Clear All) and CE (Clear Entry)
- Keyboard support
- Automated testing with Jest
- CI/CD with GitHub Actions
- Docker image published to Docker Hub
- Auto-deployment to live server via FTP

## Pipeline Stages

| Stage | Tool | Trigger |
|-------|------|---------|
| Lint | ESLint | Every push |
| Test | Jest | Every push |
| Docker Build | Docker + BuildKit | Push to main |
| Deploy | FTP | Push to main |

## Quick Start

```bash
npm install
npm test
npm run build
```

## Live Site
http://YOUR_DOMAIN.vudse26.cloud
