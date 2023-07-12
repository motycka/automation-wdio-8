import deepmerge from 'deepmerge';
import {config as cucumberConfig} from './wdio.cucumber.conf.js';

export const config = deepmerge(cucumberConfig, {
    runner: 'local',
    hostname: 'localhost',
    port: 4444,
    restart: true,
    path: '/wd/hub',
    services: [
        ['selenium-standalone', {
            logPath: `.tmp/selenium-logs`,
            seleniumArgs: {
                seleniumArgs: ["-port", "4444"],
            }
        }],
        'docker'
    ],
    dockerOptions: {
        image: 'selenium/standalone-chrome-debug',
        healthCheck: {
            url: 'http://localhost:4444',
            maxRetries: 3,
            inspectInterval: 5000,
            startDelay: 30000
        },
        options: {
            p: ['4444:4444'],
            shmSize: '2g'
        }
    }
}, { clone: false });
