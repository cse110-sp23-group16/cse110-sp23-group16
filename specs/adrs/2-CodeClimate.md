# ADRS 1: CodeClimate for Quality Check

## Context and Problem

Code climate has been set up for the repository, and is activated on code push. It has ESLint, CSSLint, MarkdownLint, and EditorConfig enabled which checks for basic linting. Code climate additionally offers further insight through their dev portal where we can view issues regarding test coverage, function usage, and many other metrics that add up together to code quality. Whenever a PR is opened, code climate additionally runs its own checks and updates status on the PR, allowing devs and reviewers to see if there are any basic code issues from github itself.

## Considered Options

- Codacy was not chosen since it only had 14 day free trial then a payment of $15/month for teams

## Outcome

We decided to implement CodeClimate for it's offer of the features and mainly since it was open source/free. Additionally, it was suggested in the canvas assignment for code quality tools. Upon exploring the tool, it was nice to see the easy setup and integration with GitHub with the Pull Requests and a potential option to integrate it with Slack if wanted in future.
