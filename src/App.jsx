import { useEffect, useState } from 'react'
import './App.css'
import { Descriptions } from './components/Descriptions'
import { getFormattedWeatherData } from './weatherService'


function App() {

  const[city, setCity]=useState("Paris");
  const[weather, setWeather]=useState(null);
  const [units, setUnits]= useState('metric');


  useEffect(()=>{
    const fetchWeatherData= async()=>{
      
      const data= await getFormattedWeatherData(city, units);
      setWeather(data);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick= (e)=>{
    const button= e.currentTarget;
    const currentUnit = button.textContent.slice(-1);

    const isCelsius = currentUnit === 'C';
    button.textContent = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "imperial" : "metric");
  }

  const enterKeyPressed=(e)=>{
    if(e.keyCode===13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className='app' style={{backgroundImage:`url(https://images.pexels.com/photos/11829339/pexels-photo-11829339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`}}>
      <div className="overlay">
        {
          weather &&(
            <div className="container">
          <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter a City name '/>
            <button onClick={(e)=>handleUnitsClick(e)}>°F</button>
          </div>

          <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL}alt="weatherIcon" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} °${units=== 'metric'? 'C' : 'F'} `}</h1>
            </div>
          </div>
          {/* bottom description */}
          <Descriptions weather={weather} units={units} />

        </div>
          )
        }
        
      </div>
    </div>
  )
}

export default App
