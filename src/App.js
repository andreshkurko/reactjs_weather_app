import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "4986bb0847cb5d3ab71bcd83c6dad874";

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }
    
    
    // Create a method that belongs to this component, the name gettingWeather is any
    
    gettingWeather = async (event) => {
        event.preventDefault();

        const city = event.target.elements.city.value;
        
    // The method that allows you to set the state
    if(city) {
        const api_url = await 
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
    // Convert information to format json
        const data = await api_url.json();

    // Convert information sunset
        var sunset = data.sys.sunset;
        var date = new Date();
        date.setTime(sunset);
        var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // Convert information sunrise
        var sunrise = data.sys.sunrise;
        var date2 = new Date();
        date.setTime(sunrise);
        var sunrise_date = date2.getHours() + ":" + date2.getMinutes() + ":" + date2.getSeconds();

        this.setState({
            temp: data.main.temp,
            city: data.name,
            country: data.sys.country,
            pressure: data.main.pressure,
            sunrise: sunrise_date,
            sunset: sunset_date,
            error: undefined
        });
    } else {
        this.setState({
            temp: undefined,
            city: undefined,
            country: undefined,
            pressure: undefined,
            sunrise: undefined,
            sunset: undefined,
            error: "Enter the name of the city"
        });
    }
}

render() {
    return (
        <div className="wrapper">
            <Info />
            <Form weatherMethod={this.gettingWeather} />
            <Weather 
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                pressure={this.state.pressure}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                error={this.state.error}
            />
        </div>
        );
    }
}
    
export default App;