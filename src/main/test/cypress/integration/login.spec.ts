import faker from 'faker';

const baseUrl: string = Cypress.config().baseUrl;

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  })
  it('should load with correct initial state', () => {
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório');
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatório');
    cy.getByTestId('submit').should('be.disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-status').should('have.attr', 'title', 'valor inválido');
    cy.getByTestId('password').type(faker.random.alphaNumeric(3));
    cy.getByTestId('password-status').should('have.attr', 'title', 'valor inválido');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('email-status').should('have.attr', 'title', 'Tudo certo');
    cy.getByTestId('password').type(faker.random.alphaNumeric(5));
    cy.getByTestId('password-status').should('have.attr', 'title', 'Tudo certo');
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error if invalid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: faker.random.words()
      }
    });
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').click();
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais Invalidas');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should save accessToken if valid credencials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.random.uuid()
      }
    });
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').click();
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then((window) => assert.isOk(window.localStorage.getItem('accessToken')));
  });
});