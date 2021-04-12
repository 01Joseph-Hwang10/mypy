module.exports = {
	"env" : {
		"browser" : true,
		"es2021" : true,
	},
	"extends" : [
		"eslint:recommended",
		"plugin:react/recommended",
		"prettier",
	],
	"parserOptions" : {
		"ecmaFeatures" : {
			"jsx" : true,
		},
		"ecmaVersion" : 12,
		"sourceType" : "module",
	},
	"plugins" : [
		"react",
	],
	"rules" : {
		"comma-dangle" : [ 'warn', {
			"arrays" : 'always',
			"objects" : 'always',
			"imports" : 'never',
			"exports" : 'never',
			"functions" : 'never',
		}, ],
		"comma-spacing" : [ 'warn', { 'before' : false, 'after' : true, }, ],
		"computed-property-spacing" : [ 'warn', 'always', ],
		"semi" : [ 'warn', 'always', ],
		"indent" : [ 'warn', 'tab', ],
		"key-spacing" : [ 'warn', { 'beforeColon' : true, 'afterColon' : true, }, ],
		"keyword-spacing" : [ 'warn', { 'before' : true, 'after' : true, }, ],
		"object-curly-spacing" : [ 'warn', 'always', ],
		"array-bracket-spacing" : [ 'warn', 'always', ],
		"space-in-parens" : [ 'warn', 'always', ],
		"space-infix-ops" : [ 'warn', ],
		"space-unary-ops" : [ 'warn', ],
		"react/prop-types" : 'off',
	},
};
