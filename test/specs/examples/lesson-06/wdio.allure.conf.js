import fs from 'fs';
import allure from 'allure-commandline';
import video from 'wdio-video-reporter';
import deepmerge from "deepmerge";
import {config as baseConfig} from '../../../../wdio.conf.js';

const allureTmpDirectory = './.tmp/allure';
const allureReportDirectory = './reports/allure';

export const config = deepmerge(baseConfig, {
    specs: [
        '../lesson-05*/*.e2e.js'
    ],

    /*
    Konfigurace reportování
     */
    reporters: [
        'spec',
        [video, {
            outputDir: allureTmpDirectory,
            saveAllVideos: true,        // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }],
        ['allure', {
            outputDir: allureTmpDirectory,
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            addConsoleLogs: true,
        }]
    ],

    /*
    Definice potřebných hooků
    */
    onPrepare: (config, capabilities) => {
        // remove previous tmp files
        fs.rmdir(allureTmpDirectory, { recursive: true }, err => {
            if (err) console.log(err);
        });
    },
    onComplete: () => {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', '--clean', allureTmpDirectory, '--output', allureReportDirectory]);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 5000);
            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout);
                if (exitCode !== 0) return reject(reportError);
                console.log('Allure report successfully generated');
                resolve()
            });
        });
    }

}, { clone: false })

