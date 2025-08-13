import * as puppeteer from 'puppeteer';
import { google } from 'googleapis';
import type { OAuth2Client } from 'googleapis-common';

type TableData = string[][];

interface Config {
    GOOGLE_CREDENTIALS: string;
    SPREADSHEET_ID: string;
    CLAIM_ID: string;
}

// Dynamically load config from env or local file
async function getConfig(): Promise<Config> {
    const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS;
    const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
    const CLAIM_ID = process.env.CLAIM_ID;

    if (GOOGLE_CREDENTIALS && SPREADSHEET_ID && CLAIM_ID) {
        return { GOOGLE_CREDENTIALS, SPREADSHEET_ID, CLAIM_ID };
    }

    // Try to load local config if not all env vars are set
    try {
        // @ts-ignore
        const { LOCAL_ENV } = await import('./inventory-scraper.local.ts');
        return {
            GOOGLE_CREDENTIALS: GOOGLE_CREDENTIALS || LOCAL_ENV.GOOGLE_CREDENTIALS,
            SPREADSHEET_ID: SPREADSHEET_ID || LOCAL_ENV.SPREADSHEET_ID,
            CLAIM_ID: CLAIM_ID || LOCAL_ENV.CLAIM_ID,
        };
    } catch (err) {
        console.error('Failed to load environment variables', err);
        throw new Error(
            'Missing required environment variables and could not load inventory-scraper.local.ts'
        );
    }
}

async function scrapeInventoriesTable(claimId: string): Promise<TableData> {
    const url = `https://bitjita.com/claims/${claimId}`;

    const browser = await puppeteer.launch({
         args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the tab navigation to load
    await page.waitForSelector('nav', { timeout: 30000 });

    // Click the "Inventories" tab if needed
    const inventoriesTabHandle = await page.evaluateHandle(() => {
        const xpath = "//button[contains(., 'Inventories')]";
        // @ts-ignore
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue as HTMLElement | null;
    });
    const combinedTotalHandle = await page.evaluateHandle(() => {
        const xpath = "//button[contains(., 'Combined Total')]";
        // @ts-ignore
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue as HTMLElement | null;
    });
    if (inventoriesTabHandle) {
        console.debug('Found Inventories tab, clicking...');
        await (inventoriesTabHandle.asElement() as puppeteer.ElementHandle)?.click();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Give it time to load

        if (combinedTotalHandle) {
            console.debug('Found Combined Total tab, clicking...');
            await (combinedTotalHandle.asElement() as puppeteer.ElementHandle)?.click();
            await new Promise(resolve => setTimeout(resolve, 2000)); // Give it time to load
        }
    }

    // Wait for the inventories table to appear
    await page.waitForSelector('table', { timeout: 60000 });

    // Extract table data
    const tableData = await page.$$eval(
        '#bits-c191 > div > div:nth-child(2) > div:nth-child(3) > div > table tr',
        rows => rows.map(row => {
            const cells = Array.from(row.querySelectorAll('th, td'));
            // @ts-ignore
            return cells.map(cell => cell.textContent?.trim() || '');
        })
    );

    await browser.close();

    return tableData;
}

function filterItems(tableData: TableData) {
    const [_header, ...rows] = tableData;
    return rows.filter(([_code, name, _total, _tier, _rarity]) => {
        return (
            // Base
            name.endsWith(' Cloth') ||
            name.endsWith(' Leather') ||
            name.endsWith(' Brick') ||
            name.endsWith(' Ingot') ||
            name.endsWith(' Planks') ||
            // Reagents
            name.endsWith(' Citric Berry') ||
            name.endsWith(' Pebbles') ||
            name.endsWith(' Glass Vial') ||
            name === 'Water Bucket' ||
            name.endsWith(' Amber Resin') ||
            name.endsWith(' Crop Oil') ||
            name === 'Pitch' ||
            name.endsWith(' Animal Hair') ||
            name.endsWith(' Straw') ||
            name.endsWith(' Braxite') ||
            name.endsWith(' Fish Oil') ||
            name.endsWith(' Gypsite') ||
            name.endsWith(' Shells') ||
            name.endsWith(' Parchment') ||
            name.endsWith(' Carvings') ||
            name.endsWith(' Pigment')
            // TODO: Add higher order items and break them down into their base components for the spreadsheet
        );
    })
        // Exclude refined items for now
        .filter(([_code, name, _total, _tier, _rarity]) => {
            return !name.startsWith('Refined');
        });
}

const ResourceNames = {
    Plank: 'Planks',
    Ingot: 'Ingots',
    Cloth: 'Cloth',
    Brick: 'Bricks',
    Leather: 'Leather',
    CitricBerry: 'Citric Berry',
    Pebble: 'Pebbles',
    Vial: 'Vials',
    WaterBucket: 'Water Buckets',
    Resin: 'Resin',
    CropOil: 'Crop Oil',
    Pitch: 'Pitch',
    AnimalHair: 'Fur',
    Straw: 'Straw',
    Braxite: 'Braxite',
    FishOil: 'Fish Oil',
    Gypsite: 'Gypsite',
    Shell: 'Crushed Shells',
    Parchment: 'Parchment',
    Carving: 'Carvings',
    Pigment: 'Pigment',
    Unknown: 'Unknown',
} as const;
type ResourceName = typeof ResourceNames[keyof typeof ResourceNames];

function mapItems(tableData: TableData) {
    return tableData.map((row) => {
        const [_code, name, total, tier, _rarity] = row;

        // Map names
        let newName: ResourceName = ResourceNames.Unknown;
        if (name.endsWith(' Cloth')) newName = ResourceNames.Cloth;
        else if (name.endsWith(' Leather')) newName = ResourceNames.Leather;
        else if (name.endsWith(' Brick')) newName = ResourceNames.Brick;
        else if (name.endsWith(' Ingot')) newName = ResourceNames.Ingot;
        else if (name.endsWith(' Planks')) newName = ResourceNames.Plank;
        else if (name.endsWith(' Citric Berry')) newName = ResourceNames.CitricBerry;
        else if (name.endsWith(' Pebbles')) newName = ResourceNames.Pebble;
        else if (name.endsWith(' Glass Vial')) newName = ResourceNames.Vial;
        else if (name === 'Water Bucket') newName = ResourceNames.WaterBucket;
        else if (name.endsWith(' Resin')) newName = ResourceNames.Resin;
        else if (name.endsWith(' Crop Oil')) newName = ResourceNames.CropOil;
        else if (name === 'Pitch') newName = ResourceNames.Pitch;
        else if (name.endsWith(' Animal Hair')) newName = ResourceNames.AnimalHair;
        else if (name.endsWith(' Straw')) newName = ResourceNames.Straw;
        else if (name.endsWith(' Braxite')) newName = ResourceNames.Braxite;
        else if (name.endsWith(' Fish Oil')) newName = ResourceNames.FishOil;
        else if (name.endsWith(' Gypsite')) newName = ResourceNames.Gypsite;
        else if (name.endsWith(' Shells')) newName = ResourceNames.Shell;
        else if (name.endsWith(' Parchment')) newName = ResourceNames.Parchment;
        else if (name.endsWith(' Carvings')) newName = ResourceNames.Carving;
        else if (name.endsWith(' Pigment')) newName = ResourceNames.Pigment;

        if (newName === ResourceNames.Unknown) {
            console.warn(`Unknown resource name: ${name}`);
        }

        // Handle mapping record to the spreadsheet format here
        return [new Date().toISOString(), 'Auto', newName, `T${tier}`, total];
    });
}

async function writeToSheet(data: TableData, GOOGLE_CREDENTIALS: string, SPREADSHEET_ID: string) {
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(GOOGLE_CREDENTIALS),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient() as OAuth2Client;

    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const sheetData = mapItems(data);

    const sheetName = 'Resource Submission Logs';

    await sheets.spreadsheets.values.clear({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A2:F`,
    });


    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A2`,
        valueInputOption: 'USER_ENTERED',
        // insertDataOption: 'INSERT_ROWS',
        requestBody: {
            values: sheetData,
        },
    });

    console.log('✅ Sheet updated');
}

async function main() {
    const { GOOGLE_CREDENTIALS, SPREADSHEET_ID, CLAIM_ID } = await getConfig();


    if (!CLAIM_ID) {
        throw new Error('CLAIM_ID environment variable is not set');
    }
    // Item, Name, Total, Tier, Rarity
    console.info('Scraping data...');
    const tableData = await scrapeInventoriesTable(CLAIM_ID);

    const filteredItems = filterItems(tableData);
    console.log('Writing to sheet...');
    await writeToSheet(filteredItems, GOOGLE_CREDENTIALS, SPREADSHEET_ID);
}

main().catch(console.error);