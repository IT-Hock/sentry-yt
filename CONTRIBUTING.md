# Contributing to Sentry-YouTrack Integration

Thank you for considering contributing to the Sentry-YouTrack Integration! This document outlines the process for contributing to the project and provides guidelines to help you get started.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers understand your report, reproduce the behavior, and find related reports.

Before creating bug reports, please check [the issue list](https://github.com/IT-Hock/sentry-yt/issues) as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as much detail as possible.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as much detail as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of the project which the suggestion is related to.
* **Explain why this enhancement would be useful** to most users.
* **List some other applications where this enhancement exists.**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the TypeScript and JavaScript styleguides
* Include adequate tests
* Document new code based on the Documentation Styleguide
* End all files with a newline

## Development Workflow

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/sentry-yt.git`
3. Add the original repository as upstream: `git remote add upstream https://github.com/IT-Hock/sentry-yt.git`
4. Install dependencies: `npm install`
5. Create a `.env` file with the required environment variables (see README.md)

### Making Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests: `npm test`
4. Commit your changes using a descriptive commit message
5. Push to your fork: `git push origin feature/your-feature-name`
6. Submit a pull request to the original repository

### Coding Standards

* Use TypeScript for all new code
* Follow the existing code style
* Write meaningful commit messages
* Include comments for complex logic
* Write tests for new features

### Testing

* Write unit tests for all new functionality
* Ensure all tests pass before submitting a pull request
* Run tests with `npm test`

## Style Guides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### TypeScript Style Guide

* Use 2 spaces for indentation
* Use camelCase for variables and functions
* Use PascalCase for classes and interfaces
* Use semicolons
* Prefer const over let
* Avoid any type when possible
* Use explicit type annotations for function returns and parameters

### Documentation Style Guide

* Use Markdown for documentation
* Reference code with backticks: `example`
* Use code blocks for multi-line code examples
* Be clear and concise

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that are bugs
* `documentation` - Issues or PRs related to documentation
* `enhancement` - Issues that are feature requests or PRs that implement new features
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested
* `wontfix` - This will not be worked on

## Thank You!

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute.