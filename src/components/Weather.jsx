//import React from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloudy_icon from '../assets/cloudy.png'
import humid_icon from '../assets/humid.png'
import snow_icon from '../assets/snow.png'
import storm_icon from '../assets/storm.png'
import drizzle_icon from '../assets/drizzle.png'
import sun_icon from '../assets/sun.png'
import wind_icon from '../assets/wind.png'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] =useState(false);

  const allIcons ={
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": storm_icon,
    "09n": storm_icon,
    "10d": storm_icon,
    "10n": storm_icon,
    "13d": snow_icon,
    "13n": snow_icon


  }


  const search = async (city)=>{
    if(city=== ""){
      alert("Enter City Name");
      return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`; 

      
      const response= await fetch(url);
      const data= await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      const icon=allIcons[data.weather[0].icon] || sun_icon;
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    }
    catch(error){
      setWeatherData(false);
      console.error("Error in fetching weather data.");
    }
  }

  useEffect(()=>{
    search("Mumbai");
  },[])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}></img>
      </div> 
      {weatherData?<>
        <img src={sun_icon} alt="" className='weather-icon'/>
      <p className='temprature'>{weatherData.temprature}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humid_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} kmph</p>
            <span>Wind speed</span>
          </div>
        </div>
        </div>
      </>:<></>}

      
    
    </div>
  )
}

export default Weather
