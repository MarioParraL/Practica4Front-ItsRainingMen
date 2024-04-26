export type Coordinates = {
  name: string;
  latitude: number;
  longitude: number;
};

export type WeatherData = {
  temperature: number;
  relativeHumidity: number;
  wind: number;
  clouds: number;
  rain: number;
  dewPoint: number;
};
