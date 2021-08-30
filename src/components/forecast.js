import React, {useState, useEffect} from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {

  // React hooks used with useState
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  /* Ensures that user did not search for a city yet
     by checking if city Parameter contains "[object Object]"
     then query will be true otherwise city parameter will be true */
  const search = (city) => {
    axios.get(
      `https://cors.bridged.cc/https://api.openweathermap.org/data/2.5/weather?q=${city != "[object Object]"
      ? city
      : query}&units=metric&APPID=270522d9b03e033388862aaf4c62ff65`)
    // Data is fetched then set to setWeather(response.data) & will make setQuery("") empty to get another query from user.
      .then((response) => {
      setWeather(response.data);
      setQuery("");
    }).catch(function(error) {
      console.log(error);
      setWeather("");
      setQuery("");
      setError({message: "Not Found", query: query});
    });
  };

  // Icon attributes
  const defaults = {
    color: "white",
    size: 112,
    animate: true
  };

  // Passes Dublin to fill blank space - swapped with user searched query.
  // [] - ensures code runs only once (per render)
  useEffect(() => {
    search("Galway, IE");
  }, []);

  // Conditional to calculate the location difference (in degrees)
  let difference = "the difference";
    if (props.temp && weather.main) {
      if (props.temp > weather.main.temp) {
        difference = <div>It is {(props.temp - weather.main.temp).toFixed(2)} °c colder</div>;
      }
      else if (weather.main.temp > props.temp) {
        difference = <div>It is {(weather.main.temp - props.temp).toFixed(2)} °c hotter</div>;
      }
      else if (weather.main.temp== props.temp) {
        difference = <div>0°c</div>;
      }
    } else {
      difference = <div></div>;
    }

  return (
    <div className="forecast">
    <div className="forecast-icon">
      <ReactAnimatedWeather icon={props.icon} color={defaults.color} size={defaults.size} animate={defaults.animate}/>
    </div>
    <div className="today-weather">
      <h3>{props.weather}</h3>
      <div className="search-box">
        {/*User enters name into search - data is stored in setQuery using onChange & e.target.value.
             e.target.value - used to get value that the user entered into search box.*/}
        <input type="text" className="search-bar" placeholder="Search any city" onChange={(e) => setQuery(e.target.value)} value={query}/>
        <div className="img-box">
          {" "}
          {/* When clicked search function is called + weather data is fetched from the query the user passed. */}
          <img alt="search" src="https://images.avishkaar.cc/workflow/newhp/search-white.png" onClick={search}/>
        </div>
      </div>
      <ul>
        {
          typeof weather.main != "undefined"
            ? (<div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img alt="temp" className="temp" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}/>
              </li>
              <li className="resp">
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li className="resp">
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li className="resp">
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)}
                  mi
                </span>
              </li>
              <li className="resp">
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)}
                  Km/h
                </span>
              </li>
              <li className="resp">
                Difference{" "}
                <span className="temp">
                  <p>{difference}</p>
                  {props.temperatureC}
                </span>
              </li>
            </div>)
            : (<li>
              {error.query}
              {error.message}
            </li>)
        }
      </ul>
    </div>
  </div>);
}
export default Forcast;
