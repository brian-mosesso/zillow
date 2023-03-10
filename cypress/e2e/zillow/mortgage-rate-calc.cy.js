let newRate = '3.0'
let homePrice = '250,000'
let downPayment = '50,000'
const principalAndInterestSelector = '#breakdown-panel > div > div > div.pie-chart > svg > g > g:nth-child(1) > g > text.arc-label-value'
const homePriceSelector = '#homePrice'
const downPaymentSelector = '#form-1_downPayment'
const interestRateSelector = '#rate'
const errorMessageSelector = '#zmm-calc-payment'

// function that gets an input field using a selector and types in a value for that field
function typeValue(selector, fieldValue) {
  cy.get(selector)
    .click()
    .clear()
    .type(fieldValue)
}

describe('mortgage rate calculator', () => {
  beforeEach(() => {
    // tests will visit this url before each one runs
    cy.visit('https://www.zillow.com/mortgage-calculator/')
  })

  it('interest rate input exists', () => {
    // gets the label id and checks the interest rate title
    cy.get('#label_4').as('interestRateLabel').should('have.text', 'Interest rate')
    // clicks on the interest rate input and checks focus
    cy.get(interestRateSelector)
    .click()
    .should('have.focus')
  })

  it('interest rate can be changed and enter pressed', () => {
    // clicks on the interest rate input and types in new rate, then enter is pressed
    cy.get(interestRateSelector)
      .click()
      .clear()
      .type(newRate)
      .type('{enter}')
      // uncomment the next 2 lines to see possible bug (this will make the test fail). The interest rate is changing back to the default value when a new number is typed and enter is pressed
      // .wait(5000)
      // .should('have.value', newRate)  
  })

  it('principal and interest calculates correctly', () => {
    // types in home price using typeValue function
    typeValue(homePriceSelector, homePrice)
    // types in down payment using typeValue function
    typeValue(downPaymentSelector, downPayment)
    // types in new interest rate using typeValue function
    typeValue(interestRateSelector, newRate)
    // checks the principal and interest from the payment breakdown
    cy.get(principalAndInterestSelector)
      .click()
      .should('have.text', '$843')
  })

  it('correct error shows for invalid number', () => {
    let invalidString = "three"
    // clicks on the interest rate input and types in new rate using typeValue function
    typeValue(interestRateSelector, invalidString)
    // checks the error message, it should error because text was entered and only numbers are accepted
    cy.get(principalAndInterestSelector).click()
    cy.get(errorMessageSelector)
      .contains(`'${invalidString}' is not a valid number`)
  })

  it('correct error shows for no value', () => {
    // clears out the interest rate field
    cy.get(interestRateSelector).clear()
    // checks the error message, it should error because no value was entered
    cy.get(principalAndInterestSelector).click()
    cy.get(errorMessageSelector)
      .contains('Invalid value')
  })

  it('correct error shows for max value', () => {
    let maxValue = 101
    // clicks on the interest rate input and types in new rate using typeValue function
    typeValue(interestRateSelector, maxValue)
    // checks the error message, it should error because only numbers equal or less than 100 are valid
    cy.get(principalAndInterestSelector).click()
    cy.get(errorMessageSelector)
      .contains('Rate must be less than or equal to 100')
  })

  it('correct error shows for min value', () => {
    let minValue = -3
    // clicks on the interest rate input and types in new rate using typeValue function
    typeValue(interestRateSelector, minValue)
    // checks the error message, it should error because only numbers equal or greater than 0 are valid
    cy.get(principalAndInterestSelector).click()
    cy.get(errorMessageSelector)
      .contains('Rate must be greater than or equal to 0')
  })

  it('correct error shows for special character', () => {
    let specialChar = '#5'
    // clicks on the interest rate input and types in new rate using typeValue function
    typeValue(interestRateSelector, specialChar)
    // checks the error message, it should error because special char was entered and only numbers are accepted
    cy.get(principalAndInterestSelector).click()
    cy.get(errorMessageSelector)
      .contains(`'${specialChar}' is not a valid number`)
  })
})