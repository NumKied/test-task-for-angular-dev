/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { Page } from '@playwright/test';

export class AppSharedPage {
  constructor(private page: Page) {}

  async navigateAndSetLanguage() {
    await this.navigateTo();
    // Forces default language
    await this.page.evaluate(() => localStorage.setItem('language', 'en-US'));
  }

  async navigateTo() {
    await this.page.goto('/');
  }
}
