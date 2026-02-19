---
description: Fix linting errors and configure IDE
---

# Fix Linting Errors Workflow

This workflow helps resolve linting errors in the GYL Modeling Agency project.

## Step 1: Reload VS Code Window

After creating `.vscode/settings.json`, reload VS Code to apply the new settings:

1. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. Type "Reload Window"
3. Select "Developer: Reload Window"

**This will suppress all 41 CSS Tailwind warnings.**

## Step 2: Install Recommended Extensions (Optional but Recommended)

// turbo

```bash
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension csstools.postcss
```

**Benefits:**

- Tailwind CSS IntelliSense: Autocomplete, syntax highlighting, color previews
- ESLint: Real-time linting
- Prettier: Code formatting
- PostCSS: Better CSS syntax support

## Step 3: Clear IDE Cache (If ARIA Error Persists)

If the ARIA error in `Tabs.tsx` still shows after reload:

1. Close VS Code completely
2. Delete the `.next` folder:

   ```bash
   Remove-Item -Recurse -Force ".next"
   ```

3. Restart VS Code
4. Restart dev server:

   ```bash
   npm run dev
   ```

## Step 4: Verify Fixes

Check that these files are error-free:

- ✅ `components/Tabs.tsx` - ARIA attribute fixed (line 35)
- ✅ `components/ui/Skeleton.tsx` - TypeScript import fixed
- ✅ `styles/globals.css` - Warnings suppressed via settings

## Step 5: Run Linting Commands

// turbo

```bash
npm run lint
npm run type-check
```

Both should complete without critical errors.

## Troubleshooting

### If CSS warnings still appear

1. Check `.vscode/settings.json` exists
2. Reload VS Code window
3. Check file associations in settings

### If ARIA error persists

1. Verify line 35 in `Tabs.tsx` shows: `aria-selected={activeTab === index}`
2. Not: `aria-selected={activeTab === index ? 'true' : 'false'}`
3. Clear IDE cache and restart

### If inline styles warning persists

- This is acceptable for dynamic components like Skeleton
- The warning can be ignored or suppressed in settings

## Summary

After completing this workflow:

- ✅ All CSS Tailwind warnings suppressed
- ✅ ARIA error fixed
- ✅ TypeScript errors resolved
- ✅ IDE properly configured for Tailwind development
