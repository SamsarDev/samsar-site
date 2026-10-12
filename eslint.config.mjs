// ESLint (flat config) — deliberately minimal.
// Prettier owns formatting; this only looks for real mistakes.
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginVue from 'eslint-plugin-vue';
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
  // Vue: the three islands and the example. 'essential' only, because Prettier
  // owns formatting and the 'recommended' set adds stylistic rules that would
  // fight it over indentation and attribute wrapping.
  ...eslintPluginVue.configs['flat/essential'],
  {
    // Inside <script setup lang="ts">, vue-eslint-parser delegates to the
    // TypeScript parser. Without this block the rules above never reach the
    // islands, which is how an explicit any survived in the most JS-heavy code
    // of the site while the linter reported a clean run.
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.vue'] },
    },
  },
  {
    // The files in examples/ are templates students copy, named with the repo's
    // `.example` convention. That rule exists to stop a real component from
    // colliding with an HTML element name, which is not the risk here.
    files: ['examples/**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
];
