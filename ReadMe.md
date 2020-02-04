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
 "baseURL": "https://api.github.com"
}
```

2. Create `searchUser.spec.js` file in the `integration` folder with the following content:
```
import { baseURL } from '../../cypress';

describe('API Testing with Cypress', () => {
   beforeEach(() => {
       cy.request(`${baseURL}/search/users?q=avaneesh+tripathi`).as('search');
   });

   it('Validate the status code', () => {
       cy.get('@search')
           .its('status')
           .should('equal', 200);
   });

   it('Validate the items length with total count', () => {
       cy.get('@search')
           .its('body')
           .should((data) => {
                expect(data.items).to.have.length(data.total_count);
           });
   });

   it('Validate if first item contains login and url keys', () => {
       cy.get('@search')
           .its('body')
           .should((data) => {
                expect(data.items[0]).to.contain.keys('login', 'url');
           });
   });

   it('Validate if the login key of first item has value avaneeshtripathi', () => {
       cy.get('@search')
           .its('body')
           .should((data) => {
                expect(data.items[0]).to.have.property('login', 'avaneeshtripathi');
           });
   });
});
```

Here we have created four tests in a suite:

- The status code should be 200.
- Should match the item length with total count.
- First item object should have the `login` and `url` keys.
- First item object should have the property `login` with value `avaneeshtripathi`.

At the top, we import our baseURL that was created in the cypress.json file. Cypress has a built-in Mocha Test Runner - so there is no need to install it separately. Tests can be grouped inside describe groups. We write tests inside it function. We want to execute the request before each of the three tests in our describe group - for that we use beforeEach().

In our test, we use the Cypress request command to search github users list along with the GET method. Making requests is possible using a specific method, e.g., GET, POST, PATCH, or DELETE. In our test, we use the GET method, but there is no need to write it - if no method is defined, Cypress uses the GET method by default.




