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

   it('Validate the response keys', () => {
       cy.get('@search')
           .its('body')
           .should((data) => {
                expect(data.items).to.have.length(data.total_count); // CHECKS THE LENGTH OF STRING/ARRAY
                expect(data.items[0]).to.contain.keys('login', 'url'); // CHECKS IF OBJECT CONTAINS ALL THE KEYS
                expect(data.items[0]).to.have.property('login', 'avaneeshtripathi'); // CHECKS IF OBJECT CONTAINS SINGLE KEY WITH VALUE (OPTIONAL)
                expect(data.items[0]).to.not.contain.keys('login2', 'url2'); // CHECKS IF OBJECT DOES'T CONTAINS ANY OF THE KEYS
                expect(data.items).to.have.lengthOf(data.total_count); // CHECKS IF STRING/ARRAY IS OF THE LENGTH
                expect(data.total_count).to.be.a('number'); // CHECKS THE TYPE OF PARAMETER
                expect(data.total_count).not.to.be.a('string'); // CHECKS THE INVERSE TYPE OF PARAMETER
                expect(data.incomplete_results).to.be.a('boolean'); // CHECKS THE TYPE OF PARAMETER
                expect(data.total_count).to.equal(3); // CHECKS FOR THE EQUALITY OF A PARAMETER
                expect(data.items).to.have.length.of.at.most(data.total_count); // CHECKS IF ARRAY/STRING LENGTH IS UPTO THE MAX VALUE
           });
   });
});