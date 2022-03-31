let weather = {
  apiKey: "6a9552dc286340058bf190729223103",
  apiKey2: "3575e969d3f7ec34a149fa5a77aecd78",

  getGeolocation: function(city){
    fetch("https://api.weatherapi.com/v1/current.json?key=" + this.apiKey + "&q=" + city)
    .then((response) => response.json())
    .then((data) => this.getWeather(data))
  },

  getWeather: function(data){
    var lat = data.location.lat
    var lon = data.location.lon
    console.log(lat, lon)

    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + this.apiKey2)
    .then((response) => response.json())
    .then((data) => this.displayWeather(data))
  },

  displayWeather: function(data){
    const { name } = data;
    const { icon, description } = data.weather[0]
    const {temp, humidity } = data.main
    const { speed } = data.wind
    console.log(name, icon, description, temp, humidity, speed)

    document.querySelector(".city").innerText = "Weather in " + name
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector(".description").innerText = description
    document.querySelector(".temp").innerText = Math.round(temp) + "°F"
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "mph"
    document.querySelector(".weather").classList.remove("loading")
  },

  search: function(){
    this.getGeolocation(document.querySelector(".search_bar").value)
  }

};

document.querySelector(".search button").addEventListener("click", function(){
  weather.search()
});

document.querySelector(".search_bar").addEventListener("keyup", function(){
  if(event.key == "Enter"){
    weather.search()
  }
});

weather
