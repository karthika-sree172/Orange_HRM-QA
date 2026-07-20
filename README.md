# OrangeHRM Enterprise Playwright Framework

This repository contains a robust, enterprise-grade UI Automation framework built using Playwright, TypeScript, and the Page Object Model (POM) design pattern. It is designed to test the OrangeHRM Demo application.

## 🏗 Architecture
- **Language**: TypeScript
- **Framework**: Playwright
- **Design Pattern**: Page Object Model (POM)
- **Utilities**: Reusable custom utilities for element interactions, waits, file uploads, date manipulations.
- **Fixtures**: Custom Playwright fixtures injected into every test.
- **CI/CD**: GitHub Actions integration.
- **Reporting**: Playwright HTML reporter, Trace Viewer, and Screenshots on failure.

## 📂 Folder Structure
- `pages/` - Page Object classes encapsulating locators and actions.
- `tests/` - Test scripts categorized into `smoke/`, `sanity/`, `regression/`, and `e2e/`.
- `fixtures/` - Custom fixtures used for dependency injection in tests.
- `utils/` - Reusable utility classes.
- `helpers/` - Additional helper functions.
- `constants/` - Centralized constants (URLs, Timeouts, Credentials).
- `test-data/` - JSON files containing test data.
- `reports/` - Output directory for HTML reports and traces.

## 🚀 Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 💻 Execution Commands

- **Run all tests**:
  ```bash
  npm run test
  ```
- **Smoke Execution**:
  ```bash
  npm run test:smoke
  ```
- **Regression Execution**:
  ```bash
  npm run test:regression
  ```
- **Cross Browser Execution**:
  ```bash
  npm run test:all-browsers
  ```
- **Headed Mode**:
  ```bash
  npm run test:headed
  ```

## 📊 Generate Reports
To view the HTML report after execution:
```bash
npm run report
```

## 🛠 Troubleshooting & Best Practices
- **Flaky Tests**: Use explicit waits (`WaitUtility`) instead of hardcoded `waitForTimeout()`.
- **Selectors**: Always prefer user-centric locators like `getByRole`, `getByText`, and `getByPlaceholder`.
- **Environment State**: Ensure the target application is accessible. OrangeHRM demo site resets data frequently; tests are designed to dynamically create prerequisite data where applicable.
