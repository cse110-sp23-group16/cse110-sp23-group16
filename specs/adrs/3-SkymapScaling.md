# ADRS 3: Skymap Scaling

## Context and Problem

We want to scale the skymap to twice of the user's screen so that the user can pan around the skymap to select the star with better percision and experience. It comes to the problem of how the scaling of the skymap will be done.

## Considered Options

- Scale the canvas
- Scale the background image and the stars

## Outcome

We decided to scale the background image and the stars because scaling the canvas causes sever performance issue on the page on some machines tested on.
