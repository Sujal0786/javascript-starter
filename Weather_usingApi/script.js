document.addEventListener('DOMContentLoaded',()=>{
const apiKey="c473246339e9ff5cad930365ec4bf5bf";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search=document.querySelector('.search input');
const button=document.querySelector('.search button');
const weathericon=document.querySelector('.weather-icon');
async function checkWeather(city){
    const response=await fetch(apiurl +  city +`&appid=${apiKey}`);
    var data=await response.json();
    
    document.querySelector('.city').innerText=data.name;
    document.querySelector('.temp').innerText=data.main.temp + "°C";
    document.querySelector('.humidity').innerText=data.main.humidity + "%";
    document.querySelector('.wind').innerText=data.wind.speed + "km/h";
    document.querySelector('.weather-icon').src="images/" + data.weather[0].main + ".png"; 

    if(data.weather[0].main == "Clouds"){
        document.querySelector('.weather-icon').src="images/clouds.png";
    }  
    else if(data.weather[0].main == "Clear"){
        document.querySelector('.weather-icon').src="images/clear.png";
    }  
    else if(data.weather[0].main == "Rain"){
        document.querySelector('.weather-icon').src="images/rain.png";
    }  
    else if(data.weather[0].main == "Snow"){
        document.querySelector('.weather-icon').src="images/snow.png";
    }  
    else if(data.weather[0].main == "Thunderstorm"){
        document.querySelector('.weather-icon').src="images/thunderstorm.png";
    }  
    else if(data.weather[0].main == "Drizzle"){
        document.querySelector('.weather-icon').src="images/drizzle.png";
    }  
    else if(data.weather[0].main == "Mist"){
        document.querySelector('.weather-icon').src="images/mist.png";
    }  
    else if(data.weather[0].main == "Smoke"){
        document.querySelector('.weather-icon').src="images/smoke.png";
    }  
   
}
 button.addEventListener('click',()=>{
  checkWeather(search.value);
 });

});