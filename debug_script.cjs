const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // Listen for console events
    page.on('pageerror', err => {
        console.error('PAGE_ERROR:', err.message);
        console.error('STACK:', err.stack);
    });
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('CONSOLE_ERROR:', msg.text());
        }
    });

    try {
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
        console.log('Page loaded.');
    } catch (e) {
        console.error('Failed to load page:', e);
    }
    
    await browser.close();
})();
