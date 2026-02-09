# Script Internationalization (i18n) Implementation

This document explains how the internationalization system works for script dialogue in the CML Narrative application.

## Overview

The i18n system supports two approaches:
- **UI Components**: Type-safe translations using Svelte stores (`$t`)
- **Scripts**: Runtime string-based translations with simple templating

## Architecture

### Files

1. **`src/lib/utils/scriptTranslations.ts`** - Contains all script dialogue translations organized by level/section
2. **`src/lib/utils/getScriptTranslation.ts`** - Translation utility functions with template interpolation support
3. **`src/lib/utils/getLineDialog.ts`** - Helper to resolve dialog from Line objects (handles both strings and functions)
4. **`src/lib/utils/stores/languageStore.ts`** - Exports `scriptT` store for Svelte components
5. **`src/lib/types/Script.ts`** - Updated to support `dialog: string | (() => string)`

### Translation Structure

```typescript
export const scriptTranslations = {
  en: {
    level1: {
      main: [
        { id: 1, dialog: 'Hello, Agent {agentName}!' },
        { id: 2, dialog: 'Welcome to the mission.' }
      ],
      outro: [
        { id: 1, dialog: 'Mission complete!' }
      ]
    }
  },
  es: {
    level1: {
      main: [
        { id: 1, dialog: '¡Hola, Agente {agentName}!' },
        { id: 2, dialog: 'Bienvenido a la misión.' }
      ],
      outro: [
        { id: 1, dialog: '¡Misión completa!' }
      ]
    }
  }
}
```

## Usage

### In Script Files

```typescript
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';
import { settingsStore } from '$lib/utils/stores/store';

let currentLanguage = 'en';

settingsStore.subscribe((value) => {
  currentLanguage = (value.language as string) || 'en';
});

const script: Script = {
  lines: [
    {
      id: 1,
      speakers: ['Bot Buddy'],
      dialog: () => getScriptTranslationWithFallback(
        currentLanguage as any,
        'level1',      // section
        'main',        // subsection
        1              // line id
      ),
      avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
      background: '/img/backgrounds/level1/1.png',
      audio: '/audio/level1/bot_buddy/bot_buddy_l1s1.wav',
      pos: 'left'
    },
    {
      id: 11,
      speakers: ['Bot Buddy'],
      // With template variables
      dialog: () => getScriptTranslationWithFallback(
        currentLanguage as any,
        'level1',
        'main',
        11,
        { agentName: agent.agent_name || 'Agent' }  // template values
      ),
      // ... rest of line config
    }
  ]
};
```

### Template Interpolation

Use `{variableName}` syntax in translation strings:

```typescript
// In scriptTranslations.ts
{
  id: 11,
  dialog: 'Sorry, Agent {agentName}, I almost blew our cover!'
}

// In script file
dialog: () => getScriptTranslationWithFallback(
  currentLanguage as any,
  'level1',
  'main',
  11,
  { agentName: agent.agent_name || 'Agent' }
)
```

## Adding New Translations

### 1. Add to scriptTranslations.ts

```typescript
export const scriptTranslations = {
  en: {
    level2: {  // New level
      main: [
        { id: 1, dialog: 'Your dialogue here' }
      ]
    }
  },
  es: {
    level2: {
      main: [
        { id: 1, dialog: 'Tu diálogo aquí' }
      ]
    }
  }
}
```

### 2. Update Script File

```typescript
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';
import { settingsStore } from '$lib/utils/stores/store';

let currentLanguage = 'en';
settingsStore.subscribe((value) => {
  currentLanguage = (value.language as string) || 'en';
});

// Replace static strings with translation functions
const script: Script = {
  lines: [
    {
      id: 1,
      speakers: ['Character Name'],
      dialog: () => getScriptTranslationWithFallback(
        currentLanguage as any,
        'level2',  // section
        'main',    // subsection
        1          // line id
      ),
      // ... rest of config
    }
  ]
};
```

## Benefits

✅ **Runtime flexibility** - No massive TypeScript union types  
✅ **Template support** - `{variable}` interpolation for dynamic content  
✅ **Fallback chain** - Falls back to English if translation missing  
✅ **Type safety** - Dialog can be string or function  
✅ **Scalable** - Organized by level/section, easy to add new translations  
✅ **Backward compatible** - Existing static strings still work  

## Performance Considerations

- Translations are loaded upfront (no lazy loading yet)
- Simple object traversal for lookups
- Functions are called on every render (cached by Svelte reactivity)
- Consider lazy loading for large scripts in future

## Migration Path

1. ✅ **Level 1 Main** - Proof of concept complete
2. Add Level 1 subsections (outro, pizza-algorithm, pizza-time)
3. Add other levels (2-5)
4. Add introduction and outro scripts
5. Optional: Implement lazy loading by level

## Example: Complete Migration

Before:
```typescript
{
  id: 1,
  speakers: ['Bot Buddy'],
  dialog: 'Here we are in 2075! We made it!',
  // ...
}
```

After:
```typescript
// scriptTranslations.ts
{ id: 1, dialog: 'Here we are in 2075! We made it!' }

// script file
{
  id: 1,
  speakers: ['Bot Buddy'],
  dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 1),
  // ...
}
```
