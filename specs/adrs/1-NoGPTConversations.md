# ADRS 1: No GPT Conversations Displayed Directly to User

## Context and Problem

GPT Allows for good text analysis and responses, however is subject to prompt injections that can allow nefarious users to get the application to return offensive, or unintented dialogue to the user.

## Considered Options

- No ChatBots
- Minimal Chatbot Usage
- Alternative Analysis (Sentiment Analysis)

## Outcome

We decided to not allow direct conversations to be displayed to users to prevent multi message threads that can be vulnerable to prompt injections. We are allowing single API requests from our backend (analyze prompts to help us customize canned responses) that aren't displayed to our user. We are allowing single message sessions with a chatbot, as they are low risk for prompt injection with proper initialization.
