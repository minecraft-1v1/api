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
		'max-len': [
      'error',
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
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
