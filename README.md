# Playwright Test Suite

A testing suite for the Practice Software Testing platform, built using [Playwright](https://playwright.dev/) and TypeScript.

---

## Getting Started

### Requirements:

-   NodeJS (24.12.x)
-   NPM (11.6.x)

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR-REPO-URL]
    cd [your-project-name]
    ```

2.  **Install Dependencies:**
    This command installs Playwright, TypeScript, and all required development dependencies.
    ```bash
    npm install
    ```

3.  **Install Browser Drivers:**
    Playwright needs to download the necessary browser binaries (Chromium, Firefox, WebKit).
    ```bash
    npx playwright install
    ```

## Environment Configuration

**IMPORTANT:** This project uses Environment Variables for secure storage of URLs and login credentials. **Do not hardcode secrets** in any test file.

### Local Setup (`.env` file)

1.  Create a file named **`.env`** in the root directory of the project.
    * **CRITICAL:** Ensure this file is listed in your `.gitignore`.

2.  Add your test environment variables.

## Running Tests

All tests are executed using the `npm test` script, which wraps the Playwright test runner (`npx playwright test`).
