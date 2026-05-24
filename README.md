# CCF — AI for students, by students.

> Fork of [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) · Live at **[api.ccfuck.me](https://api.ccfuck.me)**

[![Go](https://img.shields.io/badge/Go-1.25-00ADD8?logo=go)](https://golang.org/)
[![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D?logo=vue.js)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-LGPL%20v3-blue)](LICENSE)
[![Live](https://img.shields.io/badge/Live-api.ccfuck.me-success)](https://api.ccfuck.me)

---

## What changed

| | Upstream (ShitRouter) | This fork (CCF) |
|---|---|---|
| Brand | Sub2API | CCF · Campus · Care · Future |
| Hero | generic tagline | "AI for students, by students." |
| Palette | default blue-gray | Nord — `#81a1c1` `#88c0d0` `#a3be8c` |
| Sidebar / header | opaque dark | glassmorphism + dot-grid backdrop |
| Cards / tables | solid fills | `backdrop-filter: blur` frosted glass |
| Theme toggle | — | `document.documentElement.classList.toggle('no-glass')` |
| Font | system-ui | Space Grotesk (hero), gradient text |

---

## Home

| Before | After |
|--------|-------|
| ![](assets/screens/before-home.png) | ![](assets/screens/after-home.png) |

## Dashboard

| Before | After |
|--------|-------|
| ![](assets/screens/before-dashboard.png) | ![](assets/screens/after-dashboard.png) |

## API Keys

| Before | After |
|--------|-------|
| ![](assets/screens/before-keys.png) | ![](assets/screens/after-keys.png) |

## Usage

| Before | After |
|--------|-------|
| ![](assets/screens/before-usage.png) | ![](assets/screens/after-usage.png) |

## Channel Monitor

| Before | After |
|--------|-------|
| ![](assets/screens/before-monitor.png) | ![](assets/screens/after-monitor.png) |

## Profile

| Before | After |
|--------|-------|
| ![](assets/screens/before-profile.png) | ![](assets/screens/after-profile.png) |

---

## Stack

Go · Gin · Ent · Vue 3 · Vite · Tailwind CSS · PostgreSQL · Redis

## Quick deploy

```bash
# build embedded binary
cd backend && go build -tags embed -o sub2api ./cmd/server

# ship to VPS
scp sub2api root@your-vps:/opt/sub2api/current/
ssh root@your-vps "systemctl restart sub2api"
```

Config: `/etc/sub2api/sub2api.env` — see `deploy/systemd-release.env.example`.

---

## Connect & Support

<p align="center">
  <img src="assets/wechat-add.png" width="200" alt="WeChat" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="assets/wechat-pay.png" width="200" alt="Buy me a coffee" />
  <br/><br/>
  <sub>Add me on WeChat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Buy me a coffee ☕</sub>
</p>

---

All gateway logic from upstream. See [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) for full docs.

[GNU LGPL v3.0](LICENSE)
