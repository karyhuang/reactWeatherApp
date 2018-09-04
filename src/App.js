import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = '0f5b15fe559ec23a7b08946bcd071cc6';

// create a wrapper component
class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    // async/await is a special syntax to work with promises
    // The word “async” before a function means one simple thing: a function always returns a promise
    // The keyword await makes JavaScript wait until that promise settles and returns its result.

    // use with fetch api here

    // prevent a full page refresh
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
    // convert to JSON format
    const data = await api_call.json();

    // to prevent error when no value is entered into city and country fields
    if (city && country) {
      console.log(data); // to test 
      // use built-in setState method instead of directly modifying the state
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }
    else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values"
      })
    }
  }

  render() {
    // returns JSX which Babel will do its work to compile
    // set up a prop for the Form component named getWeather and assign the function getWeather to it
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather = {this.getWeather} />
                    <Weather 
                      temperature = {this.state.temperature}
                      city = {this.state.city}
                      country = {this.state.country}
                      humidity = {this.state.humidity}
                      description = {this.state.description}
                      error = {this.state.error}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

        
        
        

/* must export at the end */
export default App;