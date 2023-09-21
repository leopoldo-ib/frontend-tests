# For Contributors

We'd love your help! This doc covers how to submit code to the project.

## Code principles

Before contributing, please read our [ADRs](../.docs/decisions/) to better understand our fundamental approach to the development of this codebase.

## Prerequisites

- You have [Node.js](https://nodejs.org) and [NPM](https://www.npmjs.com) installed at LTS.
- You have [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) installed at the latest version (if applicable) and you know the basic commands.
- You have [Git](https://git-scm.com) installed and you are familiar with it.
- If the operating system of your machine isn't Linux, you have [Docker Compose](https://docs.docker.com/compose/) installed.

## Contributing code

1. Clone the repository

```sh
git clone git@github.com:impossible-brands/ud-dev.git
```

2. Install dependecies

```sh
npm install
```

3. Create a new branch

```sh
git checkout -b feature/your-new-branch-name
```

4. Launch a development server

```sh
shopify theme dev
```

5. Make your changes to the codebase and commit them

```sh
git commit -m "feat: added section"
```

> If you are working on the frontend side, you can use [caniuse.com](https://caniuse.com/) to know if a given technology is supported on all browsers to support.

6. Push your commit

```sh
git push
```

7. Ensure your code is [tested](#testing-changes).

8. Create a [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

> PRs should remain focused in scope and avoid containing unrelated commits.

9. Start the [code review](https://tech-wiki.impossible-brands.com/operations/development/workflows/how-a-code-review-works) process.

10. When the code review is completed, [rebase](https://tech-wiki.impossible-brands.com/operations/coding/how-to-rebase-a-pr) and [merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request#merging-a-pull-request) your PR.

> The rebase is used to keep your branch always updated with the main by bringing new commits from branch main into your branch. So if your PR is very complex or long, you should rebase it also during the development in order to address potential conflicts with the main incrementally.

> We never commit to the `main`. All contributions to this codebase happen via Pull Requests.

> The commits on the `main` are deployed on the production environment automatically, so committing directly on this branch can lead to unstable/not reviewed changes on production and make rollbacks/history revision difficult.

## Testing changes

1. Test the changes on the browser on Google Chrome and be sure that there are no errors or unusual logs in the [Console](https://developer.chrome.com/docs/devtools/console/) panel or in the [Newtwork](https://developer.chrome.com/docs/devtools/network/) panel.
2. If you are testing changes on the frontend side, perform manual tests on all the [browsers to support](#browsers-to-support) by using [BrowserStack](https://www.browserstack.com/).
3. Be sure that feature works smoothly and without glitches.
4. If you changed the code of some other pre-existing features, be sure that they work as expected.
5. Be sure that [automated tests](#automated-tests) pass both on your local machine and the [CI](#ci).
6. When the feature is deployed, perform a quick test on the production environment to verify that the code work as expected.

> For long or complex features, consider performing partial tests throughout the implementation phase to avoid a complex or long rework.

### Automated tests

This project uses [Playwright](https://playwright.dev/) as a framework to perform end-to-end automated testing.

In the [official documentation](https://playwright.dev/intro), in the section `Getting started`, you can learn how to use the main features of Playwright for executing, creating, and debugging tests.

#### Getting started

1. Copy the file `.env.example` in the same folder and name it `.env`. Then fill out the required variables inside it.
2. Run tests.

```sh
npm run test
npm test # An alias of the previous command
```

In the `package.json` you can find some NPM script for the most common commands of Playwright.

#### CI

The tests are automatically executed in the workflow `CI` via GitHub Actions every time a new commit is added to the branch `main`. When a commit is added by a Shopify bot, the tests are skipped.

You can also manually run the workflow `CI` by following [these steps](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow).

#### Visual comparison

Some tests rely on [visual comparison](https://playwright.dev/docs/test-snapshots). So sometimes you need to update the reference screenshot, for example when the page has changed. Do this by running this command:

```sh
npm run test:update-snapshots
```

Reference screenshots may be different according to the operating system. So if you are not on the same operating system as your CI (e.g. Linux), you have to generate/update also the screenshots used by the CI. Do this by using Docker Compose to run some Playwright commands in a CI-like environment:

```sh
cd .playwright

# Start a Docker container with a CI-like environment
docker-compose up -d

# Open a shell inside the Docker container
docker-compose exec test bash

# Generate/update the screenshots
npm run test:update-snapshots

# Be sure that tests pass
npm run test
```

If you want to shut down the Docker Compose environment, you can run these commands:

```sh
# Stop the Docker container
docker-compose down

# Stop and remove the Docker container, volume and image
docker-compose -v --remove-orphans --rmi=all
```

## Browsers to support

See this [page](https://tech-wiki.impossible-brands.com/operations/coding/browsers-to-support) to know which are browsers to support.
