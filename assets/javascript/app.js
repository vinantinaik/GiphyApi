var countries = ["USA", "India", "United Kingdom", "Mexico", "Iran", "Australlia", "Brazil"];
var appKey = "Y61qWuspMl6ayaDlpV7ZsyxdU4ACWIzo";

$(document).ready(function () {

    renderButtons();

    function renderButtons() {
        for (var i = 0; i < countries.length; i++) {
            var btn = $("<button>").addClass("btn").attr("data-name", countries[i]).text(countries[i]);


            $("#country-view").append(btn);


        }

       
    }
    $(document).on("click", ".btn", displayCountry);
    $(document).on("click",".img",previewImage);

    function previewImage(){

        var displayOriginal = $(this).attr("data-displayOriginal");

        if(displayOriginal === "true")
        {
            $(this).attr("src",$(this).attr("data-preview"));
            $(this).attr("data-displayOriginal",false);

        }
        else
        {
            $(this).attr("src",$(this).attr("data-original"));
            $(this).attr("data-displayOriginal",true);

        }

       
    }

    function displayCountry() {

      

        var country = $(this).attr("data-name");

       
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + appKey + "&q=" + country + "&limit=5&offset=0&rating=G&lang=en";

        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function (response) {
           
            $("#country-image").empty();
            $.each(response.data, function (i, value) {

                var imgTag = $("<img>").addClass("img").attr({
                    "src": value.images.original_still.url, "data-preview":
                    value.images.preview_gif.url,"data-original":value.images.original_still.url,"data-displayOriginal":true
                });
                $("#country-image").append(imgTag);
               
            })


        });
    }

});