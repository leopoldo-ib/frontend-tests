# Use Dawn as main reference theme

## Context and Problem Statement

We want to have a set of best practices that allow us to handle common concerns of theme development on Shopify and to focus on business logic.

Here are some examples:

- How to load CSS and JS assets
- How to add JS functionalities
- How to define and use Web Components
- How to create theme components
- How to define section settings
- How to handle localization
- How to add icons

## Considered Options

- Use [Dawn](https://github.com/Shopify/dawn) as main reference theme.
- Follow best practices learned from other projects of Underscore District.
- Followe best practices suggested in the [Shopify docs](https://shopify.dev/docs/themes/best-practices).

## Decision Outcome

Chosen option: **Use Dawn as main reference theme**, because

Dawn is Shopify's reference theme that implements the best practices of both the platform and the frontend technologies, so it's very easy to explore it and understand how to handle common concerns without reinventing the wheel.

However, we can also use other references or adopt new best practices, also discordant from Dawn, if required. If so, we track them (e.g. via ADRs).

## More Information

- [Overview of Dawn in the Shopify docs](https://shopify.dev/docs/themes/tools/dawn)
