import { useState, useEffect } from "react";

const Home = ({}) => {
     //Create a new state variable: randomNum with a default value set to 0. 
    // This will store the random number value.
    const [weatherData, setWeatherData] = useState([]);
    
   useEffect(() => {
        fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast")
        .then((response) => response.json())
        .then((data) => setWeatherData(data.items[0].forecasts))
        .catch((error) => console.error("Error fetching data:", error));
        }, []);

    return (
        <><h2>This is Home Page</h2>
        <div className="forecast-container">
            <h1>2-hour Weather Forecast</h1>
            <div className="card-grid">
                {/* loop through weather data accordingly*/}
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            {weatherData.map((item, index) => (

                                <div className="weather-card" key={index}>
                                    <h3>{item.area}</h3>
                                    <p>{item.forecast}</p>


                                </div>


                            ))}</div>

                        


                    </div>

                </div>

            </div>
        </div></>
    );
}

export default Home;