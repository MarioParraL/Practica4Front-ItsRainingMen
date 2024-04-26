import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Coordinates, WeatherData } from "../types.ts";
import { principalCities } from "../Cities.tsx";

const Weather: FunctionComponent = () => {
  const [Coordinates, setCoordinates] = useState<Coordinates>(
    principalCities["Madrid, Spain"],
  );
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 0,
    relativeHumidity: 0,
    wind: 0,
    clouds: 0,
    rain: 0,
    dewPoint: 0,
  });

  useEffect(() => {
    fetchData(Coordinates.latitude, Coordinates.longitude);
  }, [Coordinates]);

  const fetchData = (latitude: number, longitude: number) => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&current=relative_humidity_2m&current=wind_speed_10m&current=cloud_cover&current=rain&current=dew_point_2m`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather({
          temperature: data.current.temperature_2m,
          relativeHumidity: data.current.relative_humidity_2m,
          wind: data.current.wind_speed_10m,
          clouds: data.current.cloud_cover,
          rain: data.current.rain,
          dewPoint: data.current.dew_point_2m,
        });
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  };

  const changeLocationHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newLocation = target.value;
    setCoordinates(
      principalCities[newLocation] || principalCities["Madrid, Spain"],
    );
  };

  return (
    <div class="Weather">
      <h1 class="Tittle">The Weather around the World</h1>

      <div>
        <label for="cities">Choose City:</label>
        <select id="cities" onChange={changeLocationHandler}>
          {Object.keys(principalCities).map((locationName) => (
            <option key={locationName} value={locationName}>
              {locationName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label for="temperature">Cuurent Temperature:</label>
        <span id="temperature">{weather.temperature}°C</span>
      </div>
      <div>
        <label for="humidity">Current Relative Humidity:</label>
        <span id="humidity">{weather.relativeHumidity}%</span>
      </div>
      <div>
        <label for="precipitation">Wind speed:</label>
        <span id="precipitation">{weather.wind}%</span>
      </div>
      <div>
        <label for="clouds">Clouds Cover:</label>
        <span id="clouds">{weather.clouds}%</span>
      </div>
      <div>
        <label for="rain">
          Rain from large scale weather of the poceding hour:
        </label>
        <span id="rain">{weather.clouds}mm</span>
      </div>
      <div>
        <label for="DP">
          Dew Point
        </label>
        <span id="DP">{weather.dewPoint}ºC</span>
      </div>
    </div>
  );
};

export default Weather;
