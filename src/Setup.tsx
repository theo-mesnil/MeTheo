import React, { useEffect } from 'react';

import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { getWeatherByCoordinates } from 'api/weather';
import { useCoordinates } from 'contexts/Coordinates';

// @ts-ignore
import { Watch } from './components/Watch';

export function Setup() {
  const { authorize, lat, lon } = useCoordinates();

  useEffect(() => {
    if (authorize && lat && lon) {
      const data = getWeatherByCoordinates({ lat, lon });
      data.then((data2) => console.log(data2));
    }
  }, [authorize, lat, lon]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>lat : {lat}</Text>
      <Text>lon : {lon}</Text>
      <Text>authorize : {`${authorize}`}</Text>
      <Watch />
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
