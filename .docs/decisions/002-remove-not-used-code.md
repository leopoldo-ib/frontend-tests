# Remove unused code

## Context and Problem Statement

Changes and refactors may make some pieces of code unused. How do we manage that code?

## Considered Options

- Remove unused code
- Comment out unused code
- Keep unused code

## Decision Outcome

Chosen option: **Remove unused code**, because having less code in the codebase means a lower effort to understand and maintain it. In some cases, unused code can also affect performance (e.g. if it's within a CSS file with other used code).

Further, Git/GitHub allows us to retrieve the removed code at any moment, so there is no point in commenting out or keeping unused code in the codebase.

## More Information

- [Improve Code by Removing It](https://www.oreilly.com/library/view/becoming-a-better/9781491905562/ch04.html)
