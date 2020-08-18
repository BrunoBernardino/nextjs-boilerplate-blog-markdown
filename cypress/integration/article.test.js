import { cys } from '../support/utils';

describe('Article', () => {
  it('navigates to an article without errors', () => {
    cy.visit('/');

    cy.get(cys('article-title')).first().contains('Hey, world');

    cy.get(cys('article-title')).first().click({ force: true });

    cy.url().should('include', '/hey-world');

    cy.get(cys('article-content')).contains('Father Christmas');
  });
});
