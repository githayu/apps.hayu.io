/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:sort/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: ['*.js'],
  plugins: ['sort', 'better-styled-components', 'deprecation'],
  rules: {
    'deprecation/deprecation': 'warn',
    'better-styled-components/sort-declarations-alphabetically': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-anonymous-default-export': 'off',
    'react/display-name': 'off',
    'react/jsx-sort-props': 'warn',
    'react/no-children-prop': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'sort/type-properties': 'warn',
    'jsx-a11y/alt-text': 'off',
  },
}
