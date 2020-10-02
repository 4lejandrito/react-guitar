import React, { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import puppeteer from 'puppeteer'

export default async function shoot(path: string, element: ReactElement) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(
    renderToString(
      <html>
        <body style={{ margin: 0 }}>{element}</body>
      </html>
    )
  )
  await page.setViewport(
    await page.evaluate(() => ({
      width: document.querySelector('body > :not(style)')?.scrollWidth ?? 0,
      height: document.querySelector('body > :not(style)')?.scrollHeight ?? 0,
      deviceScaleFactor: 2
    }))
  )
  await page.screenshot({
    path,
    fullPage: true,
    omitBackground: true
  })
  await browser.close()
}
