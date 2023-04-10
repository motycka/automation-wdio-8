import deepmerge from 'deepmerge';
import {config as baseConfig} from '../../../../wdio.conf.js';

export const config = deepmerge(baseConfig, {
    specs: [
        './features/**/*.feature'
    ],
    exclude: [],
    suites: {
        login: [
            './features/login.feature'
        ],
        applications: [
            './features/applications.feature'
        ],
        smoke: [
            './features/login.feature',
            './features/applications.feature'
        ]
    },
    services: [
        'chromedriver',
        'geckodriver'
    ],
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
        require: [
            './steps/**/*.js'
        ],
        requireModule: [
            [
                '@babel/register',
                {
                    rootMode: 'upward',
                    ignore: ['node_modules']
                }
            ]
        ]
    }
}, { clone: false })
