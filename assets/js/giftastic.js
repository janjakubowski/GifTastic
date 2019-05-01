      // array of topics with default values 
      var topics = ["dogs", "hippos", "zebras"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGif() {

        var gifName = $(this).attr("data-name");
        var topicContainer = $("#gif-display");
        topicContainer.addClass("gif-item-container");
        var topicTitle = $("<div>");
        topicTitle.addClass("gif-item-title");
        topicTitle.text(gifName);
        

        // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=JfHIP0y01p8J0dSWEMChmhN2aWoTT7j6&tag&tag=" + gifName;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=JfHIP0y01p8J0dSWEMChmhN2aWoTT7j6&limit=10&q=" + gifName;
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            for (var i=0; i<response.data.length; i++) {
                    var imageUrl = response.data[i].images.fixed_width.url;
                    console.log (i + " : " + imageUrl);
 
                var topicImage = $("<img>");

                topicImage.attr("src", imageUrl);
                topicImage.attr("alt", gifName + " image")
                topicImage.addClass("gif-item");

                topicContainer.prepend(topicImage);
            }
            topicContainer.prepend(topicTitle);
        });
        
      }

      
      function renderTopicButtons() {

        $("#buttons-display").empty();
        $("#buttons-display").addClass("topic-buttons");
        
        for (var i = 0; i < topics.length; i++) {
          var topicBtn = $("<button>");
          topicBtn.addClass("topic-button");
          topicBtn.attr("data-name", topics[i]);
          topicBtn.text(topics[i]);
          $("#buttons-display").append(topicBtn);
        }
      }

      
      $("#add-topic-button").on("click", function(event) {
        event.preventDefault();
        
        var topic = $("#gif-input").val().trim();

        $("#gif-input").val();

        // Adding movie from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderTopicButtons();
      });


      // /////////////////// LISTENERS
      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".topic-button", displayGif);

      // Calling the renderButtons function to display the intial buttons
      renderTopicButtons();

    