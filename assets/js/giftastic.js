// ///////// Variables 
var initialTopics = ["hippopotamus", "porsche", "trending"];
var searchQuanity = 10;
var offset = 0;

var topics;         // uses sessionStorage
var favorites;      // uses localStorage


// ///////// Functions

function toggleFavorite () {

    favorites = JSON.parse(localStorage.getItem("favorites"));

    var uid = $(this).attr("data-uid");
    var isFav = $(this).attr("data-is-fav");

    if (isFav == "Y") {

        favorites.splice(favorites.indexOf(uid),1);
        $(this).removeClass("is-favorite");
        $(this).attr("data-is-fav", "N");

    } else {

        if (!Array.isArray(favorites)) {
            favorites = [uid];
        } else {
            favorites.push(uid);
        }
        $(this).addClass("is-favorite");
        $(this).attr("data-is-fav", "Y");

    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addButton () {

    event.preventDefault();
      
    var topic = $("#gif-input").val().trim();
    if (topic == 'my-favorites') {
        alert("Sorry, " + topic + "is reserved, please pick another topic to add");
        return;
    }
    topics.push(topic);
    displayTopicButtons(topics);
    sessionStorage.setItem("topics", JSON.stringify(topics));
    $("#gif-input").val("");
}

function removeButton () {

    var removeMe = $(this).attr("data-name");
    topics.splice(topics.indexOf(removeMe),1);
    displayTopicButtons(topics);
    sessionStorage.setItem("topics", JSON.stringify(topics));
}

function toggleGif() {

      var isStill = $(this).attr("data-is-still");

      if (isStill === "Y") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-is-still", "N");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-is-still", "Y");
      }

}

function displayGif() {

    var topicName = $(this).attr("data-name");

    if (topicName == 'my-favorites') {$("#gif-display").empty()};
    var allTopicContainer = $("#gif-display");
        
    var topicContainer = $("<div>");
        topicContainer.addClass("gif-one-topic-container");

    var topicTitle = $("<div>");
        topicTitle.addClass("gif-item-title");
        topicTitle.text(topicName);

    if (topicName == 'my-favorites') {

        if (favorites.length == 0) {
            alert("You haven't selected any favorites");
            return;
        }
        
        uidString = JSON.parse(localStorage.getItem("favorites"));
        var queryURL = "https://api.giphy.com/v1/gifs?"
                + "api_key=JfHIP0y01p8J0dSWEMChmhN2aWoTT7j6" 
                + "&ids=" + uidString.toString();
    
    } else {

        var queryURL = "https://api.giphy.com/v1/gifs/search?"
                + "api_key=JfHIP0y01p8J0dSWEMChmhN2aWoTT7j6"
                + "&limit=" + searchQuanity + "&offset=" + offset + "&q=" + topicName;

        offset += searchQuanity; 
    }
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        
        if (response.data.length == 0) {
            alert("No GIFs for " + topicName + " were found. Please make another selection.");
            return;
        }
        
        if (response.meta.status != 200) {
            alert("Error getting data from GIPHY API. Code = " + response.meta.status);
            return;
        }

        for (var i=0; i<response.data.length; i++) {

            var stillUrl = response.data[i].images.fixed_height_still.url;
            var animateUrl = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;
            var uid = response.data[i].id;
            
            var topicItem = $("<div>");
                topicItem.addClass("gif-item");
            
            var topicImage = $("<img>");
                topicImage.attr("src", stillUrl);
                topicImage.attr("alt", topicName + " image");
                topicImage.attr("data-still", stillUrl);
                topicImage.attr("data-animate", animateUrl);
                topicImage.attr("data-is-still", "Y");
                topicImage.addClass("gif-image");
            
            var topicRating = $("<p>");
                topicRating.text(rating);
                topicRating.addClass("gif-rating");

            var topicFavorite = $("<p>");
                topicFavorite.html('<i class="fa fa-heart" aria-hidden="true"></i>');
                topicFavorite.attr("data-uid", uid);
                topicFavorite.addClass("gif-favorite");
                if (topicName == 'my-favorites') {
                    topicFavorite.addClass("is-favorite");
                    topicFavorite.attr("data-is-fav", "Y");
                } else {
                    topicFavorite.attr("data-is-fav", "N");
                }   

            topicItem.append(topicImage, topicRating, topicFavorite);

            topicContainer.prepend(topicItem);
        }
        topicContainer.prepend(topicTitle);
        allTopicContainer.prepend(topicContainer);
    });
}
      
function displayTopicButtons(topics) {

    $("#buttons-display").empty();
    $("#buttons-display").addClass("topic-buttons");

    for (var i = 0; i < topics.length; i++) {
     
        var topicBtn = $("<button>");
            topicBtn.addClass("topic-button");
            topicBtn.attr("data-name", topics[i]);
            topicBtn.text(topics[i]);

            var btnWrapper = $("<div>");
                btnWrapper.addClass("button-wrapper");
            
            var removeBtn = $("<p>");
                removeBtn.html('<i class="fa fa-times" aria-hidden="true"></i>');
                removeBtn.addClass("remove-button");
                removeBtn.attr("data-name", topics[i]);

            btnWrapper.append(topicBtn, removeBtn);
            $("#buttons-display").append(btnWrapper);
      
    }
}

// ////////////////// Initialization

topics = JSON.parse(sessionStorage.getItem("topics"));
if (!Array.isArray(topics)) {
    topics = initialTopics;
    sessionStorage.setItem("topics", JSON.stringify(topics));
}
displayTopicButtons(topics);

favorites = JSON.parse(localStorage.getItem("favorites"));
if (!Array.isArray(favorites)) {
    favorites = [];
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// /////////////////// LISTENERS

$(document).on("click", "#add-topic-button", addButton);

$(document).on("click", ".topic-button", displayGif);

$(document).on("click", ".gif-image", toggleGif);

$(document).on("click", ".remove-button", removeButton);

$(document).on("click", ".my-favorites", displayGif);

$(document).on("click", ".gif-favorite", toggleFavorite);

$('input[type="radio"]').on('change', function(e) { 
    searchQuanity = $(this).val();
});
