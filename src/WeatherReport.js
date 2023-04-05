import './App.css';
import axios from "axios";
import React, { useState } from 'react';
import cloud from './images/cloud.png'
import wind from './images/icon-wind.png'
import compass from './images/icon-compass.png'
import weather from './images/hot.png'
import { MDBInput } from 'mdb-react-ui-kit';


export default function WeatherReport() {

    const x= new Date()
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const date = new Date().getDate();
    const weatherType = ['Blizzards', 'Heavy snow', 'Storm force winds', 'Gales', 'Severe chill effect', 'Persistent extensive hill fog', 'Thunderstorms', '>Heavy persistent rain', 'Strong sunlight'] 

    const [location, setLocation] = useState('');
    const [locationData, setLocationData] = useState(null);

    const fetchWeatherDetails = (() => {
        const url = 'http://127.0.0.1:8000/get_weather/' + location

        axios.get(url).then((response) => {
        setLocationData(response.data.SiteRep.DV.Location)
        });
      });

    return(
        <div>
            <div className="container">
                <div  className="find-location">
                    <MDBInput value={location} onChange={e => setLocation(e.target.value)} placeholder='Enter your city name...' type='text' id='formWhite' contrast />
                    <button className='info-button'  onClick={() => fetchWeatherDetails()} color='info'>Find</button>
                </div>
                </div>
                {locationData && <div className="forecast-table">
                <div className="container">
                    <div className="forecast-container">
                        <div className="today forecast">
                            <div className="forecast-header">
                                <div className="day">{weekday[x.getDay()]}</div>
                                <div className="date">{date}</div>
                            </div> 
                            <div className="forecast-content">
                                <div className="location">{locationData.name}, {locationData.country}</div>
                                <div className="degree">
                                    <div className="num">{locationData.Period[0].Rep[0].T}<sup>o</sup>C</div>
                                    <div className="forecast-icon">
                                        <img src="" alt="" width='90'/>
                                    </div>
                                </div>
                                <span><img src={cloud} alt='df' className="cloud-icon"></img>{locationData.Period[0].Rep[0].Pp}%</span>
                                <span><img src={wind} alt="k"/>{locationData.Period[0].Rep[0].S}mp/h</span>
                                <span><img src={compass} alt="degree"/>{locationData.Period[0].Rep[0].D}<sup> o</sup></span>
                                <span><img className="cloud-icon" src={weather}
                                        alt="status"/>{weatherType[locationData.Period[0].Rep[0].W]}</span>
                            </div>
                        </div>
                        {locationData.Period.slice(1).map(function(period, i){
                    return <div className="forecast">
                            <div className="forecast-header">
                                <div className="day">{date + (i+1)}</div>
                            </div>
                            <div className="forecast-content">
                                <div className="forecast-icon">
                                    {period.Rep[0].W == 9 && <div className="sun-icon"></div>}
                                    {period.Rep[0].W != 9 && <img className="cloud-expand-icon" src={cloud} alt="" width='48'/>}
                                </div>
                                <div className="degree">{period.Rep[0].T}<sup>o</sup>C</div>
                                <small>{locationData.Period[i].Rep[0].S}mp/h<sup></sup></small>
                            </div>
                        </div>
                     })}     
                </div>
            </div>
          </div>}
        </div>
    )
}