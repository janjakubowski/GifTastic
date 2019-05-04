// ///////// Variables 
var topics = ["dog", "hippopotamus", "zebra"];
// const originalNumTopics = topics.length;
var searchQuanity = 10;

// var topics = ["dog", "hippopotamus", "zebra", "animal", "wtf"];


// ///////// Functions

function toggleFavorite () {
    // var gifUid = $(this).attr("data-uid");
    console.log("favorite clicked");

}

function removeButton () {

    var removeMe = $(this).attr("data-name");
    topics.splice(topics.indexOf(removeMe),1);
    displayTopicButtons();

}

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

            // var imageUrl = response.data[i].images.fixed_height.url;
            
            var topicItem = $("<div>");
            topicItem.addClass("gif-item");

            var imageUrl = response.data[i].images.fixed_height.url;
            var topicImage = $("<img>");
            topicImage.attr("src", imageUrl);
            topicImage.attr("alt", gifName + " image");
            topicImage.addClass("gif-image");
            
            var rating = response.data[i].rating;
            var topicRating = $("<p>");
            topicRating.text(rating);
            topicRating.addClass("gif-rating");

            var topicFavorite = $("<p>");
            topicFavorite.html('<i class="fa fa-heart" aria-hidden="true"></i>');
            topicFavorite.addClass("gif-favorite");

            topicItem.append(topicImage, topicRating, topicFavorite);

            topicContainer.prepend(topicItem);
        }
        topicContainer.prepend(topicTitle);
    }); //error handling?
}
      
function displayTopicButtons() {

    $("#buttons-display").empty();
    $("#buttons-display").addClass("topic-buttons");

    for (var i = 0; i < topics.length; i++) {
     

        var topicBtn = $("<button>");
            topicBtn.addClass("topic-button");
            topicBtn.attr("data-name", topics[i]);
            topicBtn.text(topics[i]);
      
        // if (i < originalNumTopics) {

            // $("#buttons-display").append(topicBtn);

        // } else {
            
            var btnWrapper = $("<div>");
                btnWrapper.addClass("button-wrapper");
            
            var removeBtn = $("<p>");
                removeBtn.html('<i class="fa fa-times" aria-hidden="true"></i>');
                removeBtn.addClass("remove-button");
                removeBtn.attr("data-name", topics[i]);

            btnWrapper.append(topicBtn, removeBtn);
            $("#buttons-display").append(btnWrapper);
        // }
      
    }
}

  // /////////////////// LISTENERS

  $("#add-topic-button").on("click", function(event) {
      event.preventDefault();
      
      var topic = $("#gif-input").val().trim();
      topics.push(topic);


      displayTopicButtons();

      $("#gif-input").val("");
  });

  $(document).on("click", ".topic-button", displayGif);

  $(document).on("click", ".remove-button", removeButton);

  $(document).on("click", ".gif-favorite", toggleFavorite);

  // $(document).on("click", ".favs-button", displayFav);

  // $(document).on("click", ".add-favorites-button", addFav);

  $('input[type="radio"]').on('change', function(e) { 
      searchQuanity = $(this).val();
  });

  // ////////////////// Initialization
  displayTopicButtons();

