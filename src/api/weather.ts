import Config from 'react-native-config';

import { errorLog } from 'utils/logger';

export async function getWeatherByCoordinates({
  lat,
  lon
}: {
  lat: number;
  lon: number;
}) {
  try {
    // Get city name
    const getCity = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${Config.OPENWEATHER_API_KEY}`
    );
    const city = await getCity.json();

    // Get data from current location
    const getWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${Config.OPENWEATHER_API_KEY}&lang=fr`
    );
    const weather = await getWeather.json();

    return {
      cityName: city?.[0]?.name,
      ...weather
    };
  } catch (error) {
    errorLog(error);
  }
}
