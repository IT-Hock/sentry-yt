import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest
            },
            parser: tseslint.parser,
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.build.json'],
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }],
            'no-console': ['warn', {allow: ['warn', 'error', 'info']}],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single']
        }
    },
    {
        ignores: [
            'dist/**/*',
            'node_modules/**/*',
            'coverage/**/*',
            '**/*.js',
            '**/*.jsx'
        ]
    }
);