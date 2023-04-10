#noinspection NonAsciiCharacters

Feature: Applications Page


  Background:

    Given user is on the Czechitas login page
    And user "Lišák Admin" is logged in


  Scenario: User can see all applications

    When user navigates to page Přihlášky
    Then user can see between 10 to 30 applications
    And applications contain valid name, date, payment type and remaining amount to pay


  Scenario: User can see search in applications

    Given user navigates to page Přihlášky
    Then user can see between 10 to 30 applications

    When user enters text into the search field: "Test"
    Then user can see between 1 to 3 applications
    And all names on applications contain "test"

    And table shows applications:
      | name           | date       | paymentType | toPay  |
      | Testovaná Jana | 17.12.2022	| Hotově      | 100 Kč |
      | Testovič Test  | 17.12.2022 | Hotově      | 100 Kč |
