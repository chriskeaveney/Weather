import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forecast from "./forecast";
import loader from "../images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";
import "../App.css";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
  color: "white",
  size: 112,
  animate: true
};
class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined
  };

  componentDidMount() {
    // Navigator lets the app return custom results based on user location
    if (navigator.geolocation) {
      this.getPosition()
        // If the user allows location - data is fetched + sent to get weather function
        .then((position) => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
      }).catch((err) => {
        // If the user denies location - basic weather is displayed from a placeholder latitude & longitude
        this.getWeather(53.350140, -6.266155);
        alert("You have denied location. Allow access from this app to your current location for weather results.");
      });
    } else {
      alert("Geolocation is not available");
    }

    this.timerID = setInterval(() => this.getWeather(this.state.lat, this.state.lon), 600000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  // Async/Await used to fetch data from the API
  // After passing in coordinates, setState all the data gotten using API + display that data
  getWeather = async (lat, lon) => {
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`);
    const data = await api_call.json();
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
      // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),
      // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),
    });

    // Switch case for climate condition data from API.
    switch (this.state.main) {
      case "Haze":
        this.setState({icon: "CLEAR_DAY"});
        break;
      case "Clouds":
        this.setState({icon: "CLOUDY"});
        break;
      case "Rain":
        this.setState({icon: "RAIN"});
        break;
      case "Snow":
        this.setState({icon: "SNOW"});
        break;
      case "Dust":
        this.setState({icon: "WIND"});
        break;
      case "Drizzle":
        this.setState({icon: "SLEET"});
        break;
      case "Fog":
        this.setState({icon: "FOG"});
        break;
      case "Smoke":
        this.setState({icon: "FOG"});
        break;
      case "Tornado":
        this.setState({icon: "WIND"});
        break;
      default:
        this.setState({icon: "CLEAR_DAY"});
    }
  };

  render() {
    if (this.state.temperatureC) {
      return (<React.Fragment>
        <div className="dashboard-container">
          <div className="city">
            <div className="title">
              <h2>{this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="mb-icon">
              {" "}
              <ReactAnimatedWeather icon={this.state.icon} color={defaults.color} size={defaults.size} animate={defaults.animate}/>
              <p>{this.state.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true}/>
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p class="ct-resp">
                  {this.state.temperatureC}°<span>C</span>
                </p>
              </div>
            </div>
          </div>
          <Forecast temp={this.state.temperatureC} icon={this.state.icon} weather={this.state.main}/>
        </div>
      </React.Fragment>);
    } else {
      return (<React.Fragment>
        <img src={loader} style={{
            width: "30%",
            WebkitUserDrag: "none"
          }}/>
        <h3 class="loading" style={{
            color: "#0C1642",
        fontSize: "22px",
        fontWeight: "600"}}>
          Receiving your location
        </h3>
        <h3 style={{
            color: "#0C1642",
            marginTop: "10px"
          }}>
          Your geolocation will be shown
          <br></br>
          and used to calculate the real-time weather forecast.
        </h3>
      </React.Fragment>);
    }
  }
}

export default Weather;
