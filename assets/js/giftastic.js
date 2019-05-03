// ///////// Variables 
var topics = ["dog", "hippopotamus", "zebra"];
var searchQuanity = 10;

// ///////// Functions

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {

    var gifName = $(this).attr("data-name");
    var topicContainer = $("#gif-display");
    topicContainer.addClass("gif-item-container");
    var topicTitle = $("<div>");
    topicTitle.addClass("gif-item-title");
    topicTitle.text(gifName);

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=JfHIP0y01p8J0dSWEMChmhN2aWoTT7j6&limit=" + searchQuanity + "&q=" + gifName;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        // console.log(response);
        for (var i=0; i<response.data.length; i++) {

            var imageUrl = response.data[i].images.fixed_height.url;
            var topicImage = $("<img>");
            topicImage.attr("src", imageUrl);
            topicImage.attr("alt", gifName + " image")
            topicImage.addClass("gif-item");

            topicContainer.prepend(topicImage);
        }
        topicContainer.prepend(topicTitle);
    }); //error handling?
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

  // /////////////////// LISTENERS

  $("#add-topic-button").on("click", function(event) {
      event.preventDefault();
      
      var topic = $("#gif-input").val().trim();
      topics.push(topic);

      // Add display favorites button (here or in render)

      renderTopicButtons();

      $("#gif-input").val("");
  });

  $(document).on("click", ".topic-button", displayGif);

  // $(document).on("click", ".favs-button", displayFav);

  // $(document).on("click", ".add-favorites-button", addFav);

  $('input[type="radio"]').on('change', function(e) { 
      searchQuanity = $(this).val();
  });

  // ////////////////// Initialization
  renderTopicButtons();

