const dateE1 = document.getElementById("dateE1");
const temperatureDay = document.getElementById("temperatureDay");
const temperatureFeelLike = document.getElementById("temperatureFeelLike");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const windSpeed = document.getElementById("wind-speed");
const items= document.getElementById("weather-item");
const cityName= document.getElementById("cityName");
const description= document.getElementById("description");
const country = document.getElementById("country");
const icon = document.getElementById("weather-icon");
const days = ["Lundi","Mardi","Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const months = ["Janvier","Février","Mars", "Avril", "Mai", "Juin", "Juillet",
"Aout","Septembre","Octobre", "Novembre", "Décembre"];


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    let day = time.getDay(); // Jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
    day = (day === 0) ? 6 : day - 1; // Décalage d'une journée en arrière
    dateE1.innerHTML= days[day] + " " + date + " "+ months[month] + " "; 
},  1000 );//appelle l'API une fois/heure


// Charger le fichier de configuration JSON
fetch('config.json')
  .then(response => response.json())
  .then(data => {
    // Accéder à la ville et à l'URL de base de l'API météo
    const city = data.city;
    const baseWeatherApiUrl = data.base_weather_api_url;
    const appid = data.appid;
    const units = data.units || 'metric';
    
    // Former l'URL finale en ajoutant la ville et l'appid
    const weatherApiUrl = baseWeatherApiUrl + city + '&appid=' + appid + '&units=' + units;
    
    // Utiliser l'URL de l'API météo pour faire une requête
    fetch(weatherApiUrl)
      .then(response => response.json())
      .then(weatherData => {
        // Utiliser les données météorologiques comme nécessaire dans votre application
        console.log('Données météorologiques de', city, ":", weatherData);
        showWeatherData(weatherData);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données météorologiques:', error);
      });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors du chargement du fichier de configuration JSON:', error);
  });

  function showWeatherData(weatherData){
    const humidityValue = weatherData.main.humidity;
    const temperatureDayValue = weatherData.main.temp;
    const temperatureFeelLikeValue = weatherData.main.feels_like;
    const pressureValue = weatherData.main.pressure;
    const windSpeedValue = weatherData.wind.speed;
    const cityNameValue = weatherData.name;
    const descriptionValue = weatherData.weather[0].description;
    const countryValue = weatherData.sys.country;
    const iconValue = weatherData.weather[0].icon;

    humidity.innerHTML = humidityValue + "%";
    temperatureDay.innerHTML = temperatureDayValue + '&#176 C';
    temperatureFeelLike.innerHTML = temperatureFeelLikeValue + '&#176 C';
    pressure.innerHTML = pressureValue + " hPa"; 
    windSpeed.innerHTML = windSpeedValue + " m/s";
    cityName.innerHTML = cityNameValue;
    description.innerHTML = descriptionValue;
    country.innerHTML = countryValue;
    const iconUrl = `http://openweathermap.org/img/wn/${iconValue}.png`;
    icon.src= iconUrl;
}



  


