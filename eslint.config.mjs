import { defineConfig } from 'eslint/config'
import pluginCypress from 'eslint-plugin-cypress'

export default defineConfig([
  {
    files: ['cypress/**/*.js', 'src/**/*.cy.jsx'],
    extends: [pluginCypress.configs.recommended],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
])
