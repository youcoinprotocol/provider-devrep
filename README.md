
Developer Reputation is an early demo of YOU Protocol utilisation, YOU Protocol is expansive, with plans to introduce a variety of providers that cater to diverse needs.

  

**Developer Reputation** is an open-source venture within the YOU Protocol. YOU Protocol leverage the principles of Zero Knowledge Proof (ZKP) and decentralized data collection, we underline the critical importance of individual data ownership. Our shared aspiration is to cultivate an internet environment driven by humanity, grounded on a universal identity and reputation framework. Users, including developers, can review their credentials in the YOUID App and create verifiable proofs through Zero Knowledge Proof (ZKP).

  

Developer Reputation tailored to grant developers suitable credentials that mirror their competencies. In the nascent stages of job screening, developers can opt to use these credentials anonymously, aiming to mitigate overt biases and prejudicial evaluations. It's an avenue for tech professionals to validate their proficiency with credible credentials, such as those from GitHub.

  

As we embark on this project, developer profiles are sourced via the GitHub API and subjected to comprehensive analysis. Credentials are then awarded, reflecting the depth and quality of a developer's contributions to projects.

  

## Pre-requisites

  

1. Nextjs
2. Understand how ZKP works
3. Register as reputation provider. [Click here to register](https://w9n0ssyctbx.typeform.com/to/J2RQTR2V)
4. Create a Github OAuth app, note down the Client ID and Client Secret

  

## Installation

  

```jsx

# Clone  the  repository
git  clone https://github.com/youcoinprotocol/provider-devrep
cd provider-devrep

# Prepare the environment variables
Copy .env.example into .env
Update the values in .env

# Install  dependencies
npm  install --force

# Run prisma migrate
npx prisma migrate dev

# Run  the  development  server
npm  run  dev

```

  

## **Current Features**

  

- Fetch user contribution data from GitHub.

- Analyze user repositories, commits, and pull request trends.

- Produce a foundational developer credential profile.

  

## Sample Traits (TODO)

  
| Traits | Description |
|--|--|
| Contributor | Made at least 5 contribution for the past 3 months |
| Languages Explorer | This badge proves the user contributed to at least one repo in {language} 
| <Language> Veteran | This badge proves the user contributed to at least three repos in {language} |
| Polyglot Parrot | This badge proves the user contributed to repos in more than three languages |
| Pull Cub | This badge proves the user created at least one pull request (PR) and got them merged |
| Git Star | This badge proves the user contributed to at least one Open Source Project |
| Pull Bear | This badge proves the user created at least twenty pull requests (PR) and got them merged |
| Git Galaxy | This badge proves the user contributed to at least twenty Open Source Projects |
| Source Starter | This badge proves the user created at least one Open Source Project. This Open Source project has more than one fork. |
| Source Vanguard | This badge proves the user created at least one Open Source Project. This Open Source project has more than twenty forks. |
| Star Striker | This badge proves the user created at least one repo with more than 20 stars |

  

## **How You Can Contribute**

  

1.  **Extend Analysis:** Delve into GitHub API Documentations and propose new way of profiling a developers

2.  **Enhance Data Collection:** Our current data is collecting from Github. Would be great if there is any other idea of new data sources to integrate.

3.  **Code & Pull Requests:** Look at our open issues or propose your own features. Start from the latest main branch, create a feature branch, and once you're done, initiate a PR.

  

## **Contribution Workflow**

  

1. Fork this repository.

2. Clone your fork and get it running using the steps in "Getting Started."

3. Branch out: **`git checkout -b feature/your-feature-name`**

4. Implement your changes, test them thoroughly, and commit: **`git commit -m "Describe your change"`**

5. Push your branch: **`git push origin feature/your-feature-name`**

6. On GitHub, open a pull request. Detail your changes and why they're useful.

7. We'll review, provide feedback, and once everything looks good, merge your contribution!

  

## Contribution Guidelines

  

Being open-source, we thrive on community contributions. Feel free to fork, modify, and create pull requests. We have a set of guidelines to help you contribute effectively.

  

1. Before diving in, familiarize yourself with the project's documentation, especially the README and WHITEPAPER. These documents often contain important information about the project and how to contribute.

2. "Good First Issues" usually are simplier issues and hence are great starting points for newcomers.

3. Always be respectful, patient, and inclusive.

4. Instead of directly editing the main project, create a fork of the repository. This allows you to make changes without affecting the original project.

5. Regularly sync your fork with the main repository to ensure you're working with the latest version of the code.

6. For each new feature or fix, create a separate branch in your fork. This keeps your changes organized and makes the pull request process smoother.

7. Stick to the project's coding standards and style guidelines, be it indentation, variable naming, or commenting.

8. Your commit messages should clearly describe the changes made. This helps maintainers understand your contributions.

9. Before submitting your changes, test them thoroughly to ensure they work as expected and don't introduce new bugs.

10. If the project has automated tests, ensure your changes pass them. If your contribution adds new features, consider adding tests for them.

11. If your changes warrant it, update the project's documentation. This can include inline comments, README updates, or more extensive documentation changes.

12. Once you're satisfied with your changes, submit a pull request (PR) to the main repository. Ensure your PR has a descriptive title and, if necessary, elaborate on your changes in the PR description.

13. Maintainers or other contributors might provide feedback on your PR. Engage in the discussion, be open to feedback, and make any requested changes.

14. Even after your PR is merged, stay involved in the project. Respond to issues, review other PRs, or contribute further as you become more familiar with the project.

15. Before contributing, understand the project's license. By contributing, you usually agree to release your contributions under the same license.

  

## **Maintainers**

  

- YOUCoin Protocol,

  

## **License**

  

This project is licensed under the MIT License.