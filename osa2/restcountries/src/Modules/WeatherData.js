import axios from "axios"
import { useEffect, useState } from "react"


const WeatherData = ({ capital }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${capital}&appid=${api_key}`)
            .then((response) => {
                setWeather(response.data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        <div>Loading weather data..</div>
    }

    return (
        <div>
            {loading === false ? (
                <div>
                    <h2>Weather in {capital}</h2>
                    <div>Temperature {weather.main.temp}°C</div>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather.main} />
                    <div>Wind {weather.wind.speed} m/s </div>
                </div>
            ) : null}
        </div>
    )
}

export default WeatherData