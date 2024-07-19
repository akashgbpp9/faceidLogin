import {useSimpleBiometric} from '@/hooks/useSimpleBiometric';
import {BlurView} from '@react-native-community/blur';
import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {
  AppState,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export const BlurApp: FC<PropsWithChildren> = ({children}) => {
  const [appState, setAppState] = useState<string>(AppState.currentState);
  const [metric, setMetric] = useState(false);
  const [, onUseBiometric] = useSimpleBiometric();
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      setAppState(nextAppState);
    };

    // Subscribe to app state changes
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Clean up the subscription on component unmount
    return () => {
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const onBioMetric = async () => {
      const biometricsSucceed = await onUseBiometric();
      setMetric(biometricsSucceed);
    };
    onBioMetric();
  }, []);
  const onLockPress = async () => {
    const biometricsSucceed = await onUseBiometric();
    setMetric(biometricsSucceed);
  };
  return (
    <View style={styles.container}>
      {(appState !== 'active' || !metric) && (
        <BlurView style={styles.blur} blurType="light" blurAmount={7}>
          {appState == 'active' && (
            <View style={styles.centerView}>
              {/* <Image
                source={require('@/Assets/Images/logo.png')}
                style={styles.logo}
              /> */}
              <Text style={styles.text}> is locked</Text>
              <TouchableOpacity onPress={onLockPress}>
                <Text style={styles.unlock}>OPEN LOCK</Text>
              </TouchableOpacity>
            </View>
          )}
        </BlurView>
      )}
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: 'center',
  },
  container: {flex: 1},
  logo: {width: 140, height: 47},
  text: {color: '#000'},
  centerView: {alignItems: 'center'},
  unlock: {color: '#1ba7ed', fontWeight: 'bold', marginTop: '5%'},
});
