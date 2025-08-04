import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../utils/config';

// step 1: Define the LoginPage class
export class LoginPage {
  // step 2: Declare properties for locators
  page: Page;
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  errorMessage: Locator;
  loginLogo: Locator;

  // step 3: Initialize the properties in the constructor
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }

  async goto() {
    await this.page.goto(BASE_URL);
    // รอคอยให้หน้าเว็บโหลดเสร็จ
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
    //  await this.page.locator('[data-test="error"]').waitFor({ state: 'visible' });
  }

  async isLoginPageDisplayed() {
    return await this.loginLogo.isVisible();
  }
}
