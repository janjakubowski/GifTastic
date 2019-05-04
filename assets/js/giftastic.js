// ///////// Variables 
var initialTopics = ["dog", "hippopotamus", "zebra"];
// const originalNumTopics = topics.length;
var searchQuanity = 10;

// var topics = ["dog", "hippopotamus", "zebra", "animal", "wtf"];


// ///////// Functions

function toggleFavorite () {
    // var gifUid = $(this).attr("data-uid");
    // console.log("favorite clicked");
    var uid = $(this).attr("data-uid");
    var isFav = $(this).attr("data-isfav");
    console.log(uid + isFav)
    if (isFav == "Y") {
        $(this).removeClass("is-favorite");
        $(this).attr("data-isfav", "N");
    } else {
        $(this).addClass("is-favorite");
        $(this).attr("data-isfav", "Y");
    }
}

function addButton () {

    event.preventDefault();
      
    var topic = $("#gif-input").val().trim();
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

function displayGif() {

    var topicName = $(this).attr("data-name");

    var allTopicContainer = $("#gif-display");
        // topicContainer.addClass("gif-item-container");
    var topicContainer = $("<div>");
        topicContainer.addClass("gif-one-topic-container");

    var topicTitle = $("<div>");
        topicTitle.addClass("gif-item-title");
        topicTitle.text(topicName);

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=JfHIP0y01p8J0dSWEMChmhN2aWoTT7j6&limit=" + searchQuanity + "&q=" + topicName;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        
        for (var i=0; i<response.data.length; i++) {

            var imageUrl = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;
            
            var topicItem = $("<div>");
                topicItem.addClass("gif-item");
            
            var topicImage = $("<img>");
                topicImage.attr("src", imageUrl);
                topicImage.attr("alt", topicName + " image");
                topicImage.addClass("gif-image");
            
            var topicRating = $("<p>");
                topicRating.text(rating);
                topicRating.addClass("gif-rating");

            var topicFavorite = $("<p>");
                topicFavorite.html('<i class="fa fa-heart" aria-hidden="true"></i>');
                topicFavorite.addClass("gif-favorite");
                topicFavorite.attr("data-uid", response.data[i].id);
                topicFavorite.attr("data-isfav", "N");

            topicItem.append(topicImage, topicRating, topicFavorite);

            topicContainer.prepend(topicItem);
        }
        topicContainer.prepend(topicTitle);
        allTopicContainer.prepend(topicContainer);
    }); //error handling?
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
        // }
      
    }
}

  // /////////////////// LISTENERS

  $(document).on("click", "#add-topic-button", addButton);

//   $("#add-topic-button").on("click", function(event) {
//       event.preventDefault();
      
//       var topic = $("#gif-input").val().trim();
//       topics.push(topic);

//       displayTopicButtons(topics);

//       sessionStorage.setItem("topics", JSON.stringify(topics));

//       $("#gif-input").val("");
//   });

  $(document).on("click", ".topic-button", displayGif);

  $(document).on("click", ".remove-button", removeButton);

  $(document).on("click", ".gif-favorite", toggleFavorite);

  // $(document).on("click", ".favs-button", displayFav);

  // $(document).on("click", ".add-favorites-button", addFav);

  $('input[type="radio"]').on('change', function(e) { 
      searchQuanity = $(this).val();
  });

  // ////////////////// Initialization

var topics = JSON.parse(sessionStorage.getItem("topics"));
if (!Array.isArray(topics)) {
    topics = initialTopics;
    sessionStorage.setItem("topics", JSON.stringify(topics));
  }
displayTopicButtons(topics);

// var favoriteGifs = JSON.parse(localStorage.getItem("favoriteGifs"));
// if (Array.isArray(favoriteGifs)) {
//     topics = initialTopics;
//     localStorage.setItem("topics", JSON.stringify(topics));
//   }
//   displayTopicButtons(topics);


//   sessionStorage.setItem("topics", JSON.stringify(initialTopics));

