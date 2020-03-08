import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "4986bb0847cb5d3ab71bcd83c6dad874";

class App extends React.Component {
    
    
    // Create a method that belongs to this component, the name gettingWeather is any
    
    gettingWeather = async (event) => {
        event.preventDefault();

        const city = event.target.elements.city.value;
        const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
    // Convert information to format json

        const data = await api_url.json();
        console.log(data);
    }

    render() {
        return (
            <div>
                <Info />
                <Form weatherMethod={this.gettingWeather}/>
                <Weather />
            </div>
        );
    }
}

export default App;