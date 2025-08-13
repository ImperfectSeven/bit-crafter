import * as puppeteer from 'puppeteer';
import type { StoredItem } from './types';

/**
 * Scrapes the inventories table for the given claim from the Bitjita claims page.
 * @param claimId The claim ID to scrape.
 * @returns A promise that resolves to the table data.
 */
export const scrapeInventoriesTable = async (claimId: string): Promise<StoredItem[]> => {
    const url = `https://bitjita.com/claims/${claimId}`;

    const browser = await puppeteer.launch({
        // allows this to run in a linux environment like GitHub Actions
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

    return tableData.map(([_code, name, total, tier, _rarity]) => ({
        amount: Number(total),
        name: name,
        tier: Number(tier),
    }));
}