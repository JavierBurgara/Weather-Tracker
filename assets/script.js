// list (empty until given event)
var searchHistory = [];
// returns local storage search history
function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if(storedCities !== null) {
        searchHistory = storedCities;
    };

    // lists up to 10 locations
for (i = 0; i < searchHistory.length; i++) {
    if (i == 10) {
        break;
      }
    //  creates links/buttons https://getbootstrap.com/docs/4./components/list-group/
    cityListButton = $("<a>").attr({
        class: "list-group-item list-group-item-action",
        href: "#"
    });
    // appends history as a button below the search field
    cityListButton.text(searchHistory[i]);
    $(".list-group").append(cityListButton);
        }
    };
    
    var city;
    var mainCard = $(".card-body");
    // prompt getItems
    getItems();
    // main card
    function getData() {
        // my api code
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8af713bebedab909ba40e0054699acdb" // call for city weather conditions
        mainCard.empty();
        $("#weeklyForecast").empty();
        // requests
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var date = moment().format("MM/DD/YYYY");
            var iconCode = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            var name = $("<h3>").html(city + date);
            mainCard.prepend(name);
            mainCard.append($("<img>").attr("src", iconURL));
            var temp = Math.round((response.main.temp - 273.15) *1.80 + 32);
            mainCard.append($("<p>").html("Temperature: " + temp + " &#8457")); 
            var humidity = response.main.humidity;
            mainCard.append($("<p>").html("Humidity: " + humidity));
            var windSpeed = response.wind.speed;
            mainCard.append($("<p>").html("Wind Speed: " + windSpeed)); 
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            $.ajax ({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=8af713bebedab909ba40e0054699acdb=" + lat + "&lon=" + lon, // my api code
                method: "GET"
            }).then(function(response) {
                mainCard.append($("<p>").html("UV Index: <span>" + response.value + "</span>"));

                if (response.value <= 2){
                    $("span").attr("class", "btn btn-outline-success");
                };
                if (response.value > 2 && response.value <= 5) {
                    $("span").attr("class", "btn btn-outline-warning");
                };
                if (response.value > 5) {
                    $("span").attr("class", "btn btn-outline-danger");
                };
            });
        })
    };