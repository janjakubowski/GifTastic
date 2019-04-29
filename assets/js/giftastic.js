      // array of topics with default values 
      var topics = ["dogs", "hippos", "zebras"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGif() {

        var gifName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=JfHIP0y01p8J0dSWEMChmhN2aWoTT7j6&tag&tag=" + gifName;

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var imageUrl = response.data.fixed_height_small_url;

          // Creating and storing an image tag
          var topicImage = $("<img>");

          // Setting the catImage src attribute to imageUrl
          topicImage.attr("src", imageUrl);
          topicImage.attr("alt", gifName + "image");

          // Prepending the catImage to the images div
          $("#gif-display").prepend(topicImage);
          // Creating a div to hold the movie
        //   var movieDiv = $("<div class='gif-item-container'>");

          // Storing the rating data
        //   var rating = response.Rated;

          // Creating an element to have the rating displayed
        //   var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
        //   movieDiv.append(pOne);

          // Storing the release year
        //   var released = response.Released;

          // Creating an element to hold the release year
        //   var pTwo = $("<p>").text("Released: " + released);

          // Displaying the release year
        //   movieDiv.append(pTwo);

          // Storing the plot
        //   var plot = response.Plot;

          // Creating an element to hold the plot
        //   var pThree = $("<p>").text("Plot: " + plot);

          // Appending the plot
        //   movieDiv.append(pThree);

          // Retrieving the URL for the image
        //   var imgURL = response.Poster;

          // Creating an element to hold the image
        //   var image = $("<img>").attr("src", imgURL);

          // Appending the image
        //   movieDiv.append(image);

          // Putting the entire movie above the previous movies
        //   $("#movies-view").prepend(movieDiv);
        });

      }

      // Function for displaying movie data
      function renderTopicButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-display").empty();
        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("topic-button");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-display").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-topic-button").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#gif-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderTopicButtons();
      });

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".topic-button", displayGif);

      // Calling the renderButtons function to display the intial buttons
      renderTopicButtons();

    