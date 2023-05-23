# Meeting Minutes

## Meeting Information

**Meeting Date/Time:** 5/4 Thu 8:20-10:20pm <br>
**Meeting Purpose:** Complete Starting Pitch <br>
**Meeting Location:** Zoom <br>
**Note Taker:** Aiden Chen

## Attendees

People who attended:

- Victor
- Pramodya
- Shashank
- Chi
- Aiden
- Andy
- Cheng
- Khushi
- Jerry

### Summary

- Shashank proposed a new idea for the app, which every agrees on.
- Completed Starting Pitch slide draft in pdf (will make it into .md file as documentation).

### Todo

- Each person do research and come up with 5 idea/feature
  - Due: Friday afternoon

### Detail

**Shashank Idea**

- Constellation fortune telling app
- Constellations have different meaning
- Choose constellation by selecting stars
- A sky map
  - 8-10 hidden constellations in it each made up of a few stars and have associated meanings
  - (ex: a shield would mean caution, sword would be more aggressive etc)
- UX:
  - Start by asking armadillo fortune teller question
  - Teller directs user to look up at the sky, at which the sky map is presented (zoomed in, where the user can pan around in a planetarium style).
  - The teller tells you to find an area of the sky that calls to you and begin selecting stars that feel special (this would mean a user clicks on a star, the planetarium locks so you cant pan around anymore, and the user keeps selecting stars in that region).
  - Once around 6-8 stars are selected, we check against the constellation set to see which constellation has the most stars in common, and pick a constellation to present.
  - The teller will start describing the constellation and its meaning as the constellation fades in, and then relates it to your input.
- Example:
  - User: Should I take a job offer coming up?
  - Teller: Directs you to the sky (show planetarium view) and tells you to begin selecting when it feels right
  - User: Selects 5 stars
  - App: Finds that the armadillo holding a shield constellation has 4 of those 5 stars
  - Teller: Gives a spiel about the shield constellation while it fades in, "The shield represents that danger is ahead and that you must be defensive and hold your ground"
  - Teller: Continues and relates it to prompt "As such I warn you from taking the action you were planning"
- Implementation
  - Using html canvas based planetarium that constantly redraws all of the constellations in a spherical projection (which might be challenging).
  - Having one big image with the stars, and multiple small images for the constellations where we vary the alpha to fade them in or out.
