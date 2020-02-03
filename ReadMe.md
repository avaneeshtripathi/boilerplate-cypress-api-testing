#### INSTALLATIONS:
1. Install Node.js 
2. Install yarn 


#### SETUP GUIDE:
1. Initialise the project
```
yarn init -y
```

2. Install Cypress
```
yarn add cypress
```

3. Open Cypress using `npx`
```
npx cypress open
```

It should start Cypress and create a cypress folder. There are four subfolders in it: fixtures, plugins, support, and integration. In integration one there are some example tests which can be deleted. To learn more about organizing tests, please take a look at [Cypress docs](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Folder-Structure). Additionally, in root, there is a cypress.json file created. Inside, you can see only curly brackets for now.


#### WRITING A TEST CASE
1. Go to cypress.json file and add the base URL that will be used in our test
```
{
 "baseURL": "https://pokeapi.co/api/v2/pokemon"
}
```

2. Create `getPokemonName.spec.js` file in the `integration` folder with the following content:
```
import { baseURL } from '../../../cypress';

describe('API Testing with Cypress', () => {
   beforeEach(() => {
       cy.request(${baseURL}/25).as('pikachu');
   });

   it('Validate the header', () => {
       cy.get('@pikachu')
           .its('headers')
           .its('content-type')
           .should('include', 'application/json; charset=utf-8');
   });

   it('Validate the status code', () => {
       cy.get('@pikachu')
           .its('status')
           .should('equal', 200);
   });

   it('Validate the pokemon\'s name', () => {
       cy.get('@pikachu')
           .its('body')
           .should('include', { name: 'pikachu' });
   });
});
```

Here we have created three tests in a suite:

- Should contain content-type: application/json; charset=utf-8,
- The status code should be 200,
- Should contain pokemon’s name - pikachu.

At the top, we import our baseURL that was created in the cypress.json file. Cypress has a built-in Mocha Test Runner - so there is no need to install it separately. Tests can be grouped inside describe groups. We write tests inside it function. We want to execute the request before each of the three tests in our describe group - for that we use beforeEach().

In our test, we use the Cypress request command to get pokemon information along with the GET method. Making requests is possible using a specific method, e.g., GET, POST, PATCH, or DELETE. In our test, we use the GET method, but there is no need to write it - if no method is defined, Cypress uses the GET method by default.




