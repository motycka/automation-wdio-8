import {ReportAggregator} from 'wdio-html-nice-reporter';
import deepmerge from 'deepmerge';
import {config as baseConfig} from '../../../../wdio.conf.js';

const reportsDirectory = './reports/html-reports/';

export const config = deepmerge(baseConfig, {
    specs: [
        '../lesson-05*/*.e2e.js'
    ],

    /*
    Konfigurace reportování
     */
    reporters: [
        'spec',
        ["html-nice", {
            outputDir: reportsDirectory,
            filename: 'report.html',
            reportTitle: 'Czechitas Automatizované Testování',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: true
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    /*
    Definice potřebných hooků
    */
    onPrepare: (config, capabilities) => {
        let reportAggregator = new ReportAggregator({
            outputDir: reportsDirectory,
            filename: 'report.html',
            reportTitle: 'Czechitas Test Automation',
            browserName : capabilities.browserName,
            collapseTests: true,
        });
        reportAggregator.clean() ;
        global.reportAggregator = reportAggregator;
    },
    onComplete: async (exitCode, config, capabilities, results) => {
        await reportAggregator.createReport();
    },
    afterTest: async (test, context, { error, result, duration, passed, retries }) => {
        const screenshotName = (`./.tmp/${test.parent}__${test.title}.png`).replace(/ /g, '_');
        await browser.saveScreenshot(screenshotName);
    }

}, { clone: false })
