# Stargazer

---

# Landing page

Starts with the landing page, the Almighty Armadillo teller prompt the user to select a category for what they want to consolt the stars via the teller. The user can click on one of the category buttons to select or deselect it. Once the user has selected a category, a continue button then appear which leads the user to the Skymap page after being clicked.

# Constellation Skymap Page

The skymap page is composed by a huge canvas and multiple stars scatter within it. The user will be prompt to pan around the canvas and select 5 stars that call to them by clicking on the white dots. As the selection is completed, the constellation with most stars selected will appear along with a continue button that will bring the user to the explanation page.

**About scaling**

The background and stars are being scaled to be twice the size of the user's screen (through the parameter `ratio` and calculated by the function `setRatio()`) so the user can pan around and select the stars with better percision. Note that the canvas itself is the size of user screen and does not scaled because it will cause performance issue, and the panning will only move the background and the stars position.

# Explanation Page

Here the page displays the constellation that matches the stars the user picked. The armadillo begins to explain the meaning of the constellation, and its mythical significance.

# Fortune Teller Response Page

By clicking on the show response button, a textbox will show to display the armadillo teller's response on how the constellation the user chose affects their life and the response will reflect on both the category they chose in the beginning and the constellation of their stars.
After reading the response, the user can click on the continue button that leads them to the thank you page.

# Thank You Page

Once arriving at this page, the app will conclude the fortune telling and wishes the user to be wise with the information they just attained. The user has the option to go back to the beginning to see another fortune, or leave the site.
