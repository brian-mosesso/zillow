# Testing for Zillow mortgage rate calculator

This repo contains cypress automation, test cases, and defects for the Zillow mortgage rate calculator.

## Project

The repo uses npm for package management. It has a test case file and defect file in the root folder.

## Steps to run

- Install npm
- Install cypress
- Clone the `zillow` repo
- In terminal, cd into the projects root folder and run `npx cypress open`
- A cypress browser window should open up
- Click E2E Testing
- Select Chrome and click 'Start E2E Testing in Chrome'
- Click `Specs` in the nav menu of the cypress browser window
- Click on the `mortgage-rate-calc` file in `cypress/e2e/zillow` or whatever test file you would like to run
- The tests should kick off and can monitored in the cypress browser window

## Notes for the future

- Choice for coverage was based on some exploratory testing. Tests might change as requirements and AC do. As tests scale, these might need to be organized better to maintain good isolation and grouping. This automation could be expanded to included payment schedule, full report, and more robust payment breakdown testing. Tests should also be added to CI/CD pipeline.