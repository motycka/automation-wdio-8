#noinspection NonAsciiCharacters

Feature: Login Page


  Background:
    Given user is on the Czechitas login page

  Scenario: User should see login form

    Then user sees Přihlásit link in the navbar
    And user sees login form with button Přihlásit


  Scenario: User can login with valid credentials

    Given user provides username da-app.admin@czechitas.cz and password Czechitas123
    When user clicks on login button
    Then user is logged in as "Lišák Admin"


  Scenario: User cannot login with invalid credentials

    Given user provides username da-app.admin@czechitas.cz and password invalid
    When user clicks on login button
    Then toast message pops up: "Některé pole obsahuje špatně zadanou hodnotu"
    And login form error is shown: "Tyto přihlašovací údaje neodpovídají žadnému záznamu."
    And user sees Přihlásit link in the navbar
    And user sees login form with button Přihlásit


  Scenario: User cannot login with invalid credentials

    Given user provides username nikdo@czechitas.cz and password Czechitas123
    When user clicks on login button
    Then toast message pops up: "Některé pole obsahuje špatně zadanou hodnotu"
    And login form error is shown: "Tyto přihlašovací údaje neodpovídají žadnému záznamu."
    And user sees Přihlásit link in the navbar
    And user sees login form with button Přihlásit


  Scenario: User can logout

    Given user provides username da-app.admin@czechitas.cz and password Czechitas123
    And user clicks on login button
    And user is logged in as "Lišák Admin"
    When user clicks on logout in the navbar
    And user sees Přihlásit link in the navbar
