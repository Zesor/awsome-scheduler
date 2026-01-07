# CalendarKit Basic - npm Publishing Guide

Complete step-by-step guide to publish your Basic scheduler component to npm as an open-source package.

---

## 📋 Pre-Publishing Checklist

### 1. **Prepare Your Repository Structure**

Your Basic scheduler package should have this structure:
```
calendarkit-basic/
├── src/
│   ├── components/
│   │   └── scheduler/        # Your basic scheduler components
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── utils/
│   │   └── index.ts          # Utility functions
│   └── index.ts              # Main entry point
├── dist/                      # Built files (gitignored)
├── package.json
├── tsconfig.json
├── README.md
├── LICENSE (MIT)
├── .npmignore
└── .gitignore
```

### 2. **Create/Update package.json**

Create a proper `package.json` for your npm package:

```json
{
  "name": "@calendarkit/basic",
  "version": "1.0.0",
  "description": "Free open-source React calendar component with TypeScript support",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "prepublishOnly": "npm run build",
    "test": "jest",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "keywords": [
    "react",
    "calendar",
    "scheduler",
    "react-calendar",
    "react-scheduler",
    "typescript",
    "calendar-component",
    "date-picker",
    "event-calendar",
    "booking-calendar",
    "open-source"
  ],
  "author": {
    "name": "CalendarKit",
    "email": "support@calendarkit.io",
    "url": "https://calendarkit.io"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/calaboratehq/basic-scheduler.git"
  },
  "bugs": {
    "url": "https://github.com/calaboratehq/basic-scheduler/issues"
  },
  "homepage": "https://calendarkit.io",
  "license": "MIT",
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "dependencies": {
    "date-fns": "^3.0.0",
    "lucide-react": "^0.index.x",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

### 3. **Create tsconfig.json for Building**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

### 4. **Create .npmignore**

```
# Source files
src/
*.ts
*.tsx
!*.d.ts

# Config files
tsconfig.json
tsup.config.ts
.eslintrc
.prettierrc

# Development
.git
.github
node_modules
coverage
.vscode
.idea

# Documentation (keep README.md)
docs/
examples/

# Tests
__tests__
*.test.ts
*.test.tsx
*.spec.ts
*.spec.tsx

# Build artifacts
*.log
.DS_Store
```

### 5. **Create src/index.ts (Entry Point)**

```typescript
// Main exports
export { Scheduler } from './components/scheduler';
export { BasicScheduler } from './components/scheduler';

// Type exports
export type {
  CalendarEvent,
  Calendar,
  ViewType,
  CalendarTheme,
  SchedulerProps,
} from './types';

// Utility exports
export { formatDate, isDateInRange } from './utils';
```

---

## 🔨 Build Setup with tsup

### Install tsup (Modern bundler for TypeScript)

```bash
npm install -D tsup
```

### Create tsup.config.ts

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  minify: true,
  treeshake: true,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
});
```

---

## 📝 Create Excellent README.md

```markdown
# @calendarkit/basic

[![npm version](https://badge.fury.io/js/@calendarkit%2Fbasic.svg)](https://www.npmjs.com/package/@calendarkit/basic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Free, open-source React calendar component with TypeScript support. Built by [CalendarKit](https://calendarkit.io).

## ✨ Features

- 📅 Month, Week, and Day views
- ✏️ Event creation & editing
- 🎨 Calendar filtering
- ⚛️ React 18+ support
- 📘 Full TypeScript types
- 🎯 Zero dependencies (except React)
- 📦 Tiny bundle size
- 🆓 MIT License

## 📦 Installation

```bash
npm install @calendarkit/basic
# or
yarn add @calendarkit/basic
# or
pnpm add @calendarkit/basic
```

## 🚀 Quick Start

```tsx
import { Scheduler } from '@calendarkit/basic';
import '@calendarkit/basic/styles.css';

function App() {
  const [events, setEvents] = useState([]);

  return (
    <Scheduler
      events={events}
      view="week"
      onEventCreate={(event) => {
        setEvents([...events, event]);
      }}
    />
  );
}
```

## 📖 Documentation

Full documentation available at [calendarkit.io/docs](https://calendarkit.io/docs)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

MIT © [CalendarKit](https://calendarkit.io)

## 🔗 Links

- [Website](https://calendarkit.io)
- [Documentation](https://calendarkit.io/docs)
- [Pro Version](https://calendarkit.io#pricing)
```

---

## 🔐 Publishing Steps

### Step 1: Create npm Account

```bash
# If you don't have an npm account
# Go to https://www.npmjs.com/signup

# Login to npm
npm login
# Enter your username, password, and email
```

### Step 2: Test Your Package Locally

```bash
# Build the package
npm run build

# Test local installation
npm pack
# This creates a .tgz file you can test installing

# In another project, test install:
npm install /path/to/calendarkit-basic-1.0.0.tgz
```

### Step 3: Publish to npm

```bash
# First time publish
npm publish --access public

# For scoped packages (@calendarkit/basic)
npm publish --access public
```

### Step 4: Verify Publication

```bash
# Check if package is published
npm view @calendarkit/basic

# Install from npm to test
npm install @calendarkit/basic
```

---

## 🔄 Updating Your Package

### Versioning (Semantic Versioning)

```bash
# Patch release (1.0.0 → 1.0.1) - Bug fixes
npm version patch

# Minor release (1.0.0 → 1.1.0) - New features
npm version minor

# Major release (1.0.0 → 2.0.0) - Breaking changes
npm version major

# Then publish
npm publish
```

---

## 📊 Package.json Version Strategy

### Initial Release: 1.0.0
```
1.0.0 - Initial stable release with core features
```

### Bug Fixes: 1.0.x
```
1.0.1 - Fixed date formatting bug
1.0.2 - Fixed event overlap issue
```

### New Features: 1.x.0
```
1.1.0 - Added calendar filtering
1.2.0 - Added custom event colors
```

### Breaking Changes: x.0.0
```
2.0.0 - New API, removed deprecated methods
```

---

## 🎯 SEO & Discoverability

### Optimize package.json keywords

```json
{
  "keywords": [
    "react",
    "calendar",
    "scheduler",
    "react-calendar",
    "react-scheduler",
    "calendar-component",
    "typescript",
    "event-calendar",
    "date-picker",
    "booking-calendar",
    "week-view",
    "month-view",
    "day-view",
    "open-source",
    "free"
  ]
}
```

### Add Badges to README

```markdown
[![npm version](https://badge.fury.io/js/@calendarkit%2Fbasic.svg)](https://www.npmjs.com/package/@calendarkit/basic)
[![npm downloads](https://img.shields.io/npm/dm/@calendarkit/basic.svg)](https://www.npmjs.com/package/@calendarkit/basic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
```

---

## 🚀 Post-Publishing Promotion

### 1. **Submit to Directories**
- [ ] [npm](https://www.npmjs.com/package/@calendarkit/basic)
- [ ] [GitHub](https://github.com/calaboratehq/basic-scheduler)
- [ ] [Product Hunt](https://www.producthunt.com/)
- [ ] [AlternativeTo](https://alternativeto.net/)

### 2. **Developer Communities**
- [ ] Post on [Dev.to](https://dev.to/)
- [ ] Share on [Reddit r/reactjs](https://reddit.com/r/reactjs)
- [ ] Tweet on Twitter/X
- [ ] Post on [Hashnode](https://hashnode.com/)

### 3. **Add to Awesome Lists**
- [ ] [awesome-react](https://github.com/enaqx/awesome-react)
- [ ] [awesome-react-components](https://github.com/brillout/awesome-react-components)

### 4. **Create Examples**
- [ ] CodeSandbox demo
- [ ] StackBlitz demo
- [ ] GitHub examples repository

---

## 📈 Tracking Success

### npm Stats
```bash
# Check download stats
npm info @calendarkit/basic

# Check weekly downloads
https://www.npmjs.com/package/@calendarkit/basic
```

### GitHub Stats
- Stars ⭐
- Forks 🍴
- Issues 🐛
- Pull Requests 🔀

---

## 🔒 Security Best Practices

### 1. **Enable 2FA on npm**
```bash
npm profile enable-2fa auth-and-writes
```

### 2. **Add .npmrc to .gitignore**
```
# .gitignore
.npmrc
```

### 3. **Use npm provenance**
```bash
npm publish --provenance
```

---

## 📦 Complete Publishing Checklist

- [ ] Code is production-ready
- [ ] All tests pass
- [ ] TypeScript types exported
- [ ] README.md is complete
- [ ] LICENSE file added (MIT)
- [ ] package.json is configured
- [ ] .npmignore is set up
- [ ] Built successfully (`npm run build`)
- [ ] Tested locally (`npm pack`)
- [ ] Logged into npm (`npm login`)
- [ ] Published to npm (`npm publish --access public`)
- [ ] Verified on npmjs.com
- [ ] GitHub repository is public
- [ ] Added to CalendarKit website
- [ ] Announced on social media

---

## 🎓 Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [tsup Documentation](https://tsup.egoist.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 💡 Tips for Success

1. **Keep it Simple**: Basic package should be minimal and easy to use
2. **Great README**: First impression matters
3. **TypeScript Types**: Export all types for great DX
4. **Examples**: Provide CodeSandbox/StackBlitz demos
5. **Versioning**: Follow semantic versioning strictly
6. **Changelog**: Maintain CHANGELOG.md
7. **Support**: Respond to issues quickly
8. **Updates**: Regular updates show active maintenance

---

## 🚨 Common Pitfalls to Avoid

❌ Publishing with `dependencies` instead of `peerDependencies` for React
❌ Not testing the built package before publishing
❌ Missing TypeScript declaration files
❌ Forgetting to set `"access": "public"` for scoped packages
❌ Not updating version before publishing
❌ Including unnecessary files in the package
❌ Poor or missing documentation

---

## ✅ Expected Timeline

**Day 1:**
- Set up repository structure
- Configure build tools
- Write documentation

**Day 2:**
- Test package locally
- Publish to npm
- Verify installation

**Day 3:**
- Create demos
- Share on social media
- Submit to directories

**Week 1-2:**
- Monitor issues
- Fix bugs
- Gather feedback

**Month 1:**
- Release patch updates
- Build community
- Track growth

---

## 🎯 Success Metrics

**First Week:**
- 50-100 downloads
- 5-10 GitHub stars

**First Month:**
- 500+ downloads
- 50+ GitHub stars
- Listed in awesome-react

**3 Months:**
- 2,000+ downloads
- 200+ GitHub stars
- Active community

**6 Months:**
- 10,000+ downloads
- 500+ GitHub stars
- Referenced in blog posts

---

Good luck with your npm package! 🚀
