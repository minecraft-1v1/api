module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: ['airbnb-base', 'airbnb-typescript/base'],
	overrides: [
		{
			env: {
				node: true
			},
			files: [
				'*.{js,cjs}'
			],
			parserOptions: {
				sourceType: 'script',
				project: null,
			}
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		project: './tsconfig.json',
		sourceType: 'module'
	},
	plugins: [
		'detect-bad-words',
		'import',
		'prettier',
		'unicorn',
	],
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	rules: {
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
		'detect-bad-words/in-code': 'error',
    'detect-bad-words/in-comment': 'error',
		eqeqeq: [2, 'always'],
		'import/no-duplicates': ['warn', { 'prefer-inline': true }],
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'newlines-between': 'always',
			},
		],
		'import/prefer-default-export': 'off',
		'no-implicit-coercion': 'error',
		'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: '*', next: 'class' },
    ],
		'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false,
      },
    ],
		'unicorn/filename-case': [
			'error',
			{
				cases: {
					camelCase: true,
					pascalCase: true,
				},
			}
		],
		// airbnb conflicting with prettier
		'@typescript-eslint/brace-style': 'off',
		'@typescript-eslint/comma-dangle': 'off',
		'@typescript-eslint/comma-spacing': 'off',
		'@typescript-eslint/func-call-spacing': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/keyword-spacing': 'off',
		'@typescript-eslint/no-extra-semi': 'off',
		'@typescript-eslint/object-curly-spacing': 'off',
		'@typescript-eslint/semi': 'off',
		'@typescript-eslint/space-before-blocks': 'off',
		'@typescript-eslint/space-before-function-paren': 'off',
		'@typescript-eslint/space-infix-ops': 'off',
		'array-bracket-spacing': 'off',
		'arrow-parens': 'off',
		'arrow-spacing': 'off',
		'block-spacing': 'off',
		'comma-style': 'off',
		'computed-property-spacing': 'off',
		'dot-location': 'off',
		'eol-last': 'off',
		'function-call-argument-newline': 'off',
		'function-paren-newline': 'off',
		'generator-star-spacing': 'off',
		'implicit-arrow-linebreak': 'off',
		'key-spacing': 'off',
		'linebreak-style': 'off',
		'new-parens': 'off',
		'newline-per-chained-call': 'off',
		'no-floating-decimal': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-multi-spaces': 'off',
		'no-multiple-empty-lines': 'off',
		'no-spaced-func': 'off',
		'no-trailing-spaces': 'off',
		'no-whitespace-before-property': 'off',
		'nonblock-statement-body-position': 'off',
		'object-curly-newline': 'off',
		'object-property-newline': 'off',
		'one-var-declaration-per-line': 'off',
		'operator-linebreak': 'off',
		'padded-blocks': 'off',
		'quote-props': 'off',
		'rest-spread-spacing': 'off',
		'semi-spacing': 'off',
		'semi-style': 'off',
		'space-in-parens': 'off',
		'space-unary-ops': 'off',
		'switch-colon-spacing': 'off',
		'template-curly-spacing': 'off',
		'template-tag-spacing': 'off',
		'wrap-iife': 'off',
		'yield-star-spacing': 'off',
		'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        eslintIntegration: true,
        printWidth: 80,
        trimTrailingWhitespace: true,
      },
    ],
	}
}
