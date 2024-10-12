

document.querySelector('#get-weather').addEventListener('click',()=>{
    const cityInput = document.getElementById('city-input').value;
    if(cityInput){
        fetchWeatherByCity(cityInput)
    }else{
        alert('Please enter a city name or use your location.')
    }
})

document.querySelector('#use-geolocation').addEventListener('click',()=>{

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
           const lat = position.coords.latitude;
           const lon = position.coords.longitude;
           fetchWeatherData(lat,lon);
        }, error => {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location. Please enter a city name.');
        });
    }else {
        alert('Geolocation is not supported by your browser. Please enter a city name.');
    }
})

function fetchWeatherByCity(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1ef31e045c9e48947fb516929002417&units=metric`)
    .then(response => {
        if (!response.ok) {
            throw new Error('City not found');
        }
        return response.json();})
    .then(data=>{
     updateWeatherUI(data)
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please check the city name.')});

}

function fetchWeatherData(lat,lon){
 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d1ef31e045c9e48947fb516929002417&units=metric`)
 .then(response=>response.json())
 .then(data=>{
updateWeatherUI(data)
 })
 .catch(error => console.error('Error fetching weather data:', error))
}

    function updateWeatherUI(data) {
        const cityName = data.name;
        const country = data.sys.country;
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherIcon = data.weather[0].icon;

        // Update the UI with weather data
        document.getElementById('city').textContent = `${cityName}, ${country}`;
        document.getElementById('temp').textContent = `${temp}°C`;
        document.getElementById('condition').textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
        document.getElementById('humidity').textContent = `${humidity}%`;
        document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;

        const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        document.getElementById('weather-icon').src = iconUrl;
    }