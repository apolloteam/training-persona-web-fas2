const colors = require('material-colors/dist/colors');

module.exports = {
    purge: {
        enabled: process?.argv?.indexOf("build") !== -1,
        content: [
            './src/**/*.{html,ts,scss}',
        ]
    },
    darkMode: false, // or 'media' or 'class'
    important: true,
    theme: {
        screens: {
            'print': { 'raw': 'print' },
            'tablet': '600px',
            'desktop': '960px'
        },
        fontFamily: {
            html: ['Roboto', 'sans-serif']
        },
        extend: {
            colors: {
                ...colors,
                primary: 'var(--primary)',
                accent: 'var(--accent)',
                warn: 'var(--warn)',
                default: 'var(--default)'
            },
            fontSize: {
                'mini': '0.625rem'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
