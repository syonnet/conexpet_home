import asyncio
from playwright.async_api import async_playwright
import os

async def render_mindmap():
    html_path = '/home/z/my-project/scripts/conexpet_sitemap.html'
    png_path = '/home/z/my-project/download/conexpet_sitemap.png'

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(
            viewport={'width': 3200, 'height': 1800},
            device_scale_factor=2
        )
        await page.goto(f'file://{html_path}', wait_until='networkidle')
        await page.wait_for_timeout(600)

        el = page.locator('#mindmap')
        bbox = await el.bounding_box()

        # First expansion
        expand_w = max(3200, int(bbox['width'] + 200))
        expand_h = int(bbox['height'] + 200)
        await page.set_viewport_size({'width': expand_w, 'height': expand_h})
        await page.wait_for_timeout(300)

        # Draw connectors
        await page.evaluate('if(typeof drawAllLines==="function") drawAllLines()')
        await page.wait_for_timeout(300)

        # Trim to content
        trim = await page.evaluate('''() => {
            const map = document.getElementById('mindmap');
            const nodes = map.querySelectorAll('.root-node,.branch-node,.sub-node,.leaf,.deep-node');
            const mapRect = map.getBoundingClientRect();
            let maxR = 0, maxB = 0;
            nodes.forEach(n => {
                const r = n.getBoundingClientRect();
                maxR = Math.max(maxR, r.right - mapRect.left);
                maxB = Math.max(maxB, r.bottom - mapRect.top);
            });
            return { contentW: Math.ceil(maxR) + 120, contentH: Math.ceil(maxB) + 120 };
        }''')

        final_w = max(expand_w, trim['contentW'])
        final_h = trim['contentH']
        await page.set_viewport_size({'width': final_w, 'height': final_h})
        await page.wait_for_timeout(300)

        # Redraw connectors after resize
        await page.evaluate('if(typeof drawAllLines==="function") drawAllLines()')
        await page.wait_for_timeout(300)

        await el.screenshot(path=png_path)
        await browser.close()

        size_kb = os.path.getsize(png_path) / 1024
        print(f'OK {png_path} ({size_kb:.0f}KB)')

asyncio.run(render_mindmap())
