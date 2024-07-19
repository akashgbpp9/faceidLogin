import {useCallback, useEffect, useState} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export const useSimpleBiometric = () => {
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);

  useEffect(() => {
    rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        const {available, biometryType} = resultObject;

        if (
          available &&
          (biometryType === BiometryTypes.TouchID ||
            biometryType === BiometryTypes.FaceID ||
            biometryType === BiometryTypes.Biometrics)
        ) {
          setBiometricsAvailable(true);
        }
      })
      .catch(() => console.log('Biometrics ERROR'));
  }, []);

  const onBiometric = useCallback(() => {
    return new Promise<boolean>(res => {
      rnBiometrics
        .simplePrompt({promptMessage: 'Confirm Your Identity'})
        .then(resultObject => {
          const {success} = resultObject;

          res(success);
        })
        .catch(() => {
          console.log('biometrics failed');
          res(false);
        });
    });
  }, []);

  return [biometricsAvailable, onBiometric] as const;
};
