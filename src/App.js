import React from "react";
import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"

const API_KEY = "3acadd090ca9d80b93c77d75bf90cd40"

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined

  }

  getWeather = async (event) => {
    event.preventDefault()
    const city = event.target.elements.city.value 
    const country = event.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`)
    const data = await api_call.json()
    console.log(data)
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    })
  }

  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather 
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}    
        />
      </div>
    );
  }
} 

export default App;