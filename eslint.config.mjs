// ESLint (flat config) — deliberately minimal.
// Prettier owns formatting; this only looks for real mistakes.
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/**'],
  },
  // TypeScript: unused variables and imports, explicit any, and so on.
  ...tseslint.configs.recommended,
  // Astro: correct directives and template validity.
  ...eslintPluginAstro.configs.recommended,
  // Accessibility: 34 static rules over the .astro templates. They require
  // eslint-plugin-jsx-a11y-x, the only fork whose peer range covers ESLint 10.
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
];
