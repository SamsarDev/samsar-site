// ESLint (flat config) — deliberadamente mínimo.
// El formato lo gobierna Prettier; aquí solo se buscan errores reales.
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/**'],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
];
