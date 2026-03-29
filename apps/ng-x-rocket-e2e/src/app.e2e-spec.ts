import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './page-objects/login.po';
import { AppSharedPage } from './page-objects/app-shared.po';
import { ShellPage } from './page-objects/shell.po';

test.describe('when the app loads', () => {
  let page: Page;
  let login: LoginPage;
  let app: AppSharedPage;
  let shell: ShellPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    login = new LoginPage(page);
    app = new AppSharedPage(page);
    shell = new ShellPage(page);
    await app.navigateAndSetLanguage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should display the login page', async () => {
    await expect(page).toHaveURL(/\/login/);
  });

  test.describe('and the user logs in', () => {
    test.beforeAll(async () => {
      await login.login();
    });

    test('should display the hello message', async () => {
      await page.waitForSelector('app-root h1');
      await expect(await shell.getParagraphText()).toEqual('Hello world !');
    });
  });
});
