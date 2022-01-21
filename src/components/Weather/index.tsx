import React from 'react';
import { Text, View } from 'react-native';

export interface WeatherProps {
  cityName: string;
}

export const Weather: React.FC<WeatherProps> = ({ cityName }) => {
  return (
    <View>
      <Text>{cityName}</Text>
    </View>
  );
};
