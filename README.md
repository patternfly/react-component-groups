# PatternFly Extended Components

This repo contains a set of opinionated react components used to standardize functionality and look and feel across Red Hat products.  The components are based of PatternFly with some additional functionality specific to Red Hat products.  While they are specific to Red Hat products in their implementation and design they can be used outside of Red Hat.

## Building for production

- run yarn install
- run yarn build

## Development
- run yarn install
- run yarn start to build and start the development server

## Testing and Linting
- run yarn test to run the tests for the demo component
- run yarn lint to run the linter

## A11y testing

- run yarn build:docs followed by yarn serve:docs, then run yarn test:a11y in a new terminal window to run our accessibility tests for the components. Once the accessibility tests have finished running you can run yarn 
- serve:a11y to locally view the generated report.

