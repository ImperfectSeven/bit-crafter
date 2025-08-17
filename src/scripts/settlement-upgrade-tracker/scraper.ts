import * as puppeteer from 'puppeteer';
import type { Inventory, StoredItem, ScraperSettings } from './types.js';

/**
 * Scrapes the inventories table for the given claim from the Bitjita claims page.
 * Items are grouped by their storage container.
 * @param claimId The claim ID to scrape.
 * @returns A promise that resolves to the table data.
 */
export const scrapeInventoriesTable = async (claimId: string, opts?: ScraperSettings): Promise<Inventory> => {
    const url = `https://bitjita.com/claims/${claimId}`;
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const inventoriesTabHandle = await page.evaluateHandle(() => {
        const xpath = "//button[contains(., 'Inventories')]";
        // @ts-ignore
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue as HTMLElement | null;
    });
    if (inventoriesTabHandle) {
        console.debug('Found Inventories tab, clicking...');
        await (inventoriesTabHandle.asElement() as puppeteer.ElementHandle)?.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    page.on('console', async msg => {
        const args = msg.args();
        const values = await Promise.all(args.map(arg => arg.jsonValue()));
        console.log(`[browser ${msg.type()}]`, ...values);
    });

    const inventories = await page.$$eval('[data-slot="accordion-item"][id^="bits-c"]', storageNodes => {
        const results: Inventory = {};
        console.log(`Found ${storageNodes.length} storage nodes`);

        for (const storageNode of storageNodes) {
            const id = (storageNode as HTMLElement).getAttribute('id') || `unknown-${Math.random().toString(36).slice(2)}`;

            const trigger = storageNode.querySelector('[data-slot="accordion-trigger"]');
            const rawName = Array.from(trigger?.childNodes || [])
                .filter(n => n.nodeType === Node.TEXT_NODE)
                .map(n => n.textContent?.trim())
                .join(' ')
                .trim();

            const storageName = rawName.replace(/\s*\(.*?\)\s*$/, '').trim() || 'Unknown Storage';

            console.log(`Processing storage: ${storageName} [${id}]`);

            const itemBlocks = storageNode.querySelectorAll('[data-slot="accordion-content"] .bg-muted\\/50');
            const items: StoredItem[] = [];


            let slotIndex = 0;
            itemBlocks.forEach((itemBlock) => {
                const name = itemBlock.querySelector('.text-center.text-xs.font-medium')?.textContent?.trim() || '';
                const tier = itemBlock.querySelector('.mt-1 .text-xs')?.textContent?.trim()?.replace(/[^0-9]/g, '') || '';
                const amount = Array.from(itemBlock.querySelectorAll('div'))
                    .map(div => div.textContent?.trim())
                    .find(text => /^x\d+/.test(text || ''))?.replace(/^x/, '') || '';

                if (name && tier && amount) {
                    items.push({
                        name,
                        tier: Number(tier),
                        amount: Number(amount),
                        slotIndex,
                    });
                    slotIndex++;
                }
            })

            results[id] = { storageName, items };
        }

        return results;
    });
    await browser.close();

    /** Handle removing things based on settings here */
    for (const storageId of Object.keys(inventories)) {
        const storage = inventories[storageId];

        if (opts?.onlyIncludeStalls && !storageIsStall(storage.storageName)) {
            console.debug(`Excluding non-stall storage: ${storage.storageName}`);
            delete inventories[storageId];
            continue;
        }
        if (opts?.triggerItem) {
            const hasTriggerItem = storageHasTriggerItem(storage.items, opts.triggerItem, opts.triggerSlot, opts.triggerItemQty);
            if ((opts.excludeTrigger && hasTriggerItem) || (opts.includeTrigger && !hasTriggerItem)) {
                console.debug(`Excluding storage due to trigger item condition: ${storage.storageName}`);
                delete inventories[storageId];
                continue;
            }
        }
    }
    console.log(`Filtered inventories`, { inventories });

    return inventories;
};

const storageIsStall = (storageName: string): boolean => {
    return storageName.endsWith(' Stall');
}

const storageHasTriggerItem = (items: StoredItem[], triggerItem: string, triggerSlot?: number, triggerItemQty?: number): boolean => {
    if (triggerSlot === undefined) {
        return items.some(item => item.name.toLowerCase() === triggerItem.toLowerCase() && triggerItemQty !== undefined && triggerItemQty === item.amount);
    }
    // If slot is negative, check the last slot
    if (triggerSlot < 0) return items[items.length - 1]?.name.toLowerCase() === triggerItem.toLowerCase() && triggerItemQty !== undefined && triggerItemQty === items[items.length - 1].amount;
    
    return (items[triggerSlot]?.name ?? '').toLowerCase()  === triggerItem.toLowerCase() && triggerItemQty !== undefined && triggerItemQty === items[triggerSlot].amount;
}