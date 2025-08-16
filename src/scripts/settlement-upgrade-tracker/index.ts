import { exit } from 'process';
import { scrapeInventoriesTable } from './scraper.js';
import { mapRelevantItemData, writeToSheet } from './sheet-helper.js';
import type { Config } from './types.js';

/** Dynamically load config from env or local file */
async function getConfig(): Promise<Config> {
    const { GOOGLE_CREDENTIALS, SPREADSHEET_ID, CLAIM_ID, SETTINGS } = process.env;
    // Try to load from environment variables first
    if (GOOGLE_CREDENTIALS && SPREADSHEET_ID && CLAIM_ID && SETTINGS) {
        console.debug('Loading environment variables...');
        return {
            GOOGLE_CREDENTIALS,
            SPREADSHEET_ID,
            CLAIM_ID,
            SETTINGS: SETTINGS ? JSON.parse(SETTINGS) : undefined
        };
    }

    // Try to load local config if not all env vars are set
    // If running locally, then expects a local file `inventory-scraper.local.ts` to provide defaults
    // that file should export a `LOCAL_ENV` object with the same structure as above
    try {
        console.debug('Loading local environment variables...');
        // @ts-ignore
        const { LOCAL_ENV } = await import('./env.local.ts');
        return {
            GOOGLE_CREDENTIALS: LOCAL_ENV.GOOGLE_CREDENTIALS,
            SPREADSHEET_ID: LOCAL_ENV.SPREADSHEET_ID,
            CLAIM_ID: LOCAL_ENV.CLAIM_ID,
            SETTINGS: LOCAL_ENV.SETTINGS,
        };
    } catch (err) {
        console.error('Failed to load environment variables', err);
        throw new Error(
            'Missing required environment variables and could not load inventory-scraper.local.ts'
        );
    }
}

async function main() {
    const { GOOGLE_CREDENTIALS, SPREADSHEET_ID, CLAIM_ID, SETTINGS } = await getConfig();

    console.info(`Attempting to scrape data...`);
    const tableData = await scrapeInventoriesTable(CLAIM_ID, SETTINGS);

    console.info(`Getting Relevant Items...`);
    const relevantItems = mapRelevantItemData(tableData);

    console.info(`Writing to sheet...`);
    await writeToSheet(relevantItems.sort((a, b) => a.tier.toString().localeCompare(b.tier.toString())), { GOOGLE_CREDENTIALS, SPREADSHEET_ID });
}

main().catch(console.error).finally(() => exit());