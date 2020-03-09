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

        this.setState({
            temp: data.main.temp,
            city: data.name,
            country: data.sys.country,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            error: ""
        });
    }
}

render() {
    return (
        <div>
            <Info />
            <Form weatherMethod={this.gettingWeather} />
            <Weather 
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                error={this.state.error}
            />
        </div>
        );
    }
}
    
export default App;