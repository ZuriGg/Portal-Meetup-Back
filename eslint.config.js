import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        languageOptions: { globals: globals.node },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }],
        },
    },
    pluginJs.configs.recommended,
];
