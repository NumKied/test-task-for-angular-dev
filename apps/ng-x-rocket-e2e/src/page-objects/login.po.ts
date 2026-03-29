/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(username = 'test', password = '123') {
    await this.page.fill('input[formControlName="username"]', username);
    await this.page.fill('input[formControlName="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
