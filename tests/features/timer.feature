Feature: Timer countdown

  Scenario: Inputs are correctly initialized on page load
    Given I open the timer app
    Then the hours input should be enabled and show "0"
    And the minutes input should be enabled and show "0"
    And the seconds input should be enabled and show "30"

  Scenario: Custom timer duration is correctly set
    Given I open the timer app
    When I set the minutes input to "2"
    And I set the seconds input to "15"
    And I click the start button
    Then the timer display should show "00:02:15"
    And the progress bar should be at 100%

  Scenario: Start the timer and let it count down for a few seconds
    Given I open the timer app
    When I click the start button
    Then the timer should count down by at least 1 second
    And the hours input should be disabled
    And the minutes input should be disabled
    And the seconds input should be disabled

  Scenario: Start button hides, Pause and Reset buttons show
    Given I open the timer app
    When I click the start button
    Then the start button should not be visible
    And the pause button should be visible
    And the reset button should be visible

  Scenario: Pause button pauses the timer and shows correct buttons
    Given I open the timer app
    And I click the start button
    When I click the pause button
    Then the timer should not change after 2 seconds
    And the pause button should not be visible
    And the start button should be visible
    And the reset button should be visible

  Scenario: Reset button resets timer and shows only the start button
    Given I open the timer app
    And I click the start button
    And I click the pause button
    When I click the reset button
    Then the timer display should show "00:00:30"
    And the start button should be visible
    And the pause button should not be visible
    And the reset button should not be visible

  Scenario: Progress bar indicates countdown status
    Given I open the timer app
    Then the progress bar should be at 100%
    When I click the start button
    Then the progress bar should start decreasing
    And the progress bar should visually represent the remaining time
    When I click the pause button
    Then the progress bar should stop updating
    When I click the start button
    Then the progress bar should continue decreasing
    When I click the reset button
    Then the progress bar should reset to 100%
