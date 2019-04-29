# GifTastic
Week 06 - Homework: Use the GIPHY API to dynamically create web pages based on user's choice

## My Portfolio 

See how it works for yourself:

link1

link2 my portfolio

## Objectives

As with every week, leverage knowledge from the previous weeks, add the following: 

1. APIs & AJAX - first homework assignment using these whihc will be critical to the upcoming three projects

2. First homewrok requiring the use of forms to get user input to get a topic for gifs they are intrested in seeing

3. More practice dynmaically creating html elements 

## Assignment

1. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

2. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

3. Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step.

4. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

### Bonus Goals

1. Ensure your app is fully mobile responsive.

2. Allow users to request additional gifs to be added to the page.
   * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

4. Include a 1-click download button for each gif, this should work across device types.

5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

6. Allow users to add their favorite gifs to a `favorites` section.
   * This should persist even when they select or add a new topic.
   * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).

## Personal Challenges

Things that I'm going to add to challange myself.

1. 

## Necessary Evil
- GIPHY API developer's key can expire or get overloaded 
