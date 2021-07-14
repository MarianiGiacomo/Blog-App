const user = {
  name: 'Test User',
  username: 'testuser',
  password: 'password'
}

describe('Login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('login page can be opened', function() {
    cy.contains('Login')
  })

  it('user can log in', function() {
    cy.get('#username')
      .type(user.username)
    cy.get('#password')
      .type(user.password)
    cy.contains('Login')
      .click()
    cy.contains(`${user.username} logged in`)
  })
})

describe('when logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
    cy.get('#username')
      .type(user.username)
    cy.get('#password')
      .type(user.password)
    cy.contains('Login')
      .click()
  })

  it('name of the user is shown', function() {
    cy.contains(`${user.username} logged in`)
  })

  it('a new blog can be created', function() {
    cy.contains('New blog')
      .click()
    cy.get('#title')
      .type('a blog by cypress')
    cy.get('#author')
      .type('cypress test')
    cy.get('#url')
      .type('http://cypress.com')
    cy.contains('Save')
      .click()
    cy.contains('a blog by cypress')
  })

  it('blog page opens and shows blog info', function() {
    cy.contains('New blog')
      .click()
    cy.get('#title')
      .type('a blog by cypress')
    cy.get('#author')
      .type('cypress test')
    cy.get('#url')
      .type('http://cypress.com')
    cy.contains('Save')
      .click()
    cy.get('td > a')
      .first()
      .click()
    cy.contains('http://cypress.com')
  })

  it('comments can be added', function() {
    cy.contains('New blog')
      .click()
    cy.get('#title')
      .type('a blog by cypress')
    cy.get('#author')
      .type('cypress test')
    cy.get('#url')
      .type('http://cypress.com')
    cy.contains('Save')
      .click()
    cy.get('td > a')
      .first()
      .click()
    cy.contains('Add comment')
      .click()
    cy.get('#comment')
      .type('nice blog cypress!')
    cy.contains('Save')
      .click()
    cy.contains('nice blog cypress!')
    cy.contains(/\.*Test User - \.*/)
  })
})