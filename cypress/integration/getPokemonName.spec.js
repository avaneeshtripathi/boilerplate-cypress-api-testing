import { baseURL } from '../../../cypress';

describe('API Testing with Cypress', () => {
   beforeEach(() => {
       cy.request(`${baseURL}/25`).as('pikachu');
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