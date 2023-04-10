import fs from 'fs';
import deepmerge from 'deepmerge';
import {config as baseConfig} from '../../../../wdio.conf.js';

const passedDirectory = 'screenshots/passed';
const failedDirectory = 'screenshots/failed';

function createIfNotExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function deleteFiles(dir) {
    fs.rm(dir, { recursive: true }, err => {
        if (err) console.log(err);
    });
}

export const config = deepmerge(baseConfig, {
    specs: [
        '../lesson-05*/*.e2e.js'
    ],

    /*
    Definice potřebných hooků
    */
    onPrepare: (config, capabilities) => {
        deleteFiles("screenshots");
    },

    afterTest: (test, context, { error, result, duration, passed, retries }) => {
        const screenshotName = (`${test.parent}__${test.title}.png`).replace(/ /g, '_');
        if (passed === true) {
            createIfNotExists(passedDirectory);
            browser.saveScreenshot( `${passedDirectory}/${screenshotName}`);
        } else {
            createIfNotExists(failedDirectory);
            browser.saveScreenshot(`${failedDirectory}/${screenshotName}`);
        }
    }

}, { clone: false })
