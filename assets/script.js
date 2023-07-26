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
        }).then(function(reponse){
            var date = moment().format("MM/DD/YYYY");
            var iconCode = reponse.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            var name = $("<h3>").html(city + date);
            mainCard.prepend(name);
            mainCard.append($("<img>").attr("src", iconURL));
            var temp = Math.round((reponse.main.temp - 273.15) *1.80 + 32);
            

        })
    };