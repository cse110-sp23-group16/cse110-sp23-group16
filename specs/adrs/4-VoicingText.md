# ADRS 4: Voicing Text

## Context and Problem

We want to have voices to read the explanation and response once the user has finished selection. However, this was decided to be implemented in the last week, and using external APIs is a little risky, given the little time. SpeechSynthesis API is an option, but different users have different brower-contained voices, and most of the voices are machinery, which can make the user experience worse.

## Considered Options

- External APIs
- SpeechSynthesis API
- Implement SpeechSynthesis, but have it turned off by default, and user can turn it back on on the landing page.

## Outcome

We decided to Implement SpeechSynthesis, and have it turned off by default, and user can turn it back on on the landing page.
