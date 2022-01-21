import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { getWeatherByCoordinates } from 'api/weather';
import { Weather } from 'components/Weather';
import { useCoordinates } from 'contexts/Coordinates';

export function Home() {
  const { authorize, lat, lon } = useCoordinates();
  const [data, setDate] = useState();

  useEffect(() => {
    if (authorize && lat && lon) {
      const weather = getWeatherByCoordinates({ lat, lon });
      weather.then((res) => {
        // console.log(res);
        setDate(res);
      });
    }
  }, [authorize, lat, lon]);

  return (
    <SafeAreaView style={styles.container}>
      {data && <Weather {...data} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
