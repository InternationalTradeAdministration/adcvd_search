import puppeteer from 'puppeteer';
import mockServer from 'pptr-mock-server';
const mockResponse = require('./adcvd_orders-paper.json');

jest.setTimeout(30000);

let browser;
let page;
const baseAppUrl = 'http://localhost:3000';
const baseApiUrl = 'https://api.trade.gov/v1/adcvd_orders/search';

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 100,
  });
  page = await browser.newPage();
  await page.goto('http://localhost:3000')
  // await page.setViewport({ width: 1040, height: 500});

});

test('intro text is present', async () => {
  const introTextElement = `#searchContainer > div > div > p:nth-child(1)`;
  const introTextSample = await page.$eval(introTextElement, e => e.innerText);
  await page.waitForSelector(introTextElement, 5000);
  expect(introTextSample).toContain("Through the enforcement of U.S. Antidumping Duty (AD) and Countervailing Duty (CVD) trade laws,");
});

test('can enter a search term and get results', async () => {
  const mockRequest = await mockServer.init(page, {
    baseAppUrl,
    baseApiUrl,
  });
  const responseConfig = {body: mockResponse};
  await mockRequest.on('GET', baseApiUrl, 200, responseConfig);

  const inputField = `#searchContainer > div > div > form > input[type=text]`;
  const searchButton = `#searchContainer > div > div > form > button`;
  await page.click(inputField);
  await page.type(inputField, "paper");
  await page.click(searchButton);

  const thirdFilterCategory = '#searchContainer > div > div > div > div.FiltersContainer > details:nth-child(4) > summary';
  await page.waitForSelector(thirdFilterCategory, 10000);
  const thirdFilterName = await page.$eval(thirdFilterCategory, e => e.innerHTML);
  expect(thirdFilterName).toBe('Countries');

  await page.click(thirdFilterCategory);
  const firstCountryLabel = '#searchContainer > div > div > div > div.FiltersContainer > details:nth-child(4) > label:nth-child(2)';
  const firstCountryHtml = await page.$eval(firstCountryLabel, e => e.innerHTML);
  expect(firstCountryHtml).toBe('<input type=\"checkbox\" name=\"countries\" value=\"Australia\"> Australia: 1');

  const searchMessageElement = '#searchContainer > div > div > div > div.ResultsList > p';
  await page.waitForSelector(searchMessageElement, 10000);
  const searchMessageText = await page.$eval(searchMessageElement, e => e.innerText);
  expect(searchMessageText).toBe('22 results from ADCVD Cases were found for paper.');
});

afterAll(() => browser.close());