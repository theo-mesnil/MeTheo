import { useEffect } from 'react';
import { Alert } from 'react-native';
import * as WatchConnect from 'react-native-watch-connectivity';
import Config from 'react-native-config';

export function Watch() {
  useEffect(() => {
    WatchConnect.sendMessage(
      { message: Config.OPENWEATHER_API_KEY },
      (error) => {
        if (error) {
          Alert.alert("information can't be sent");
        }
      }
    );
  }, []);

  return null;
}
