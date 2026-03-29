/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { Page } from '@playwright/test';

export class ShellPage {
  constructor(private page: Page) {}

  async getParagraphText() {
    return this.page.textContent('app-root h1');
  }
}
