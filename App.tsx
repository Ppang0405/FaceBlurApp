import React, {useEffect} from 'react';
import {Linking, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {
  Camera,
  CameraPosition,
  useCameraDevice,
  useCameraPermission,
  useSkiaFrameProcessor,
} from 'react-native-vision-camera';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {hasPermission, requestPermission} = useCameraPermission();
  const position: CameraPosition = 'front';
  const device = useCameraDevice(position);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const frameProcessor = useSkiaFrameProcessor(frame => {
    'worklet';
    frame.render();

  }, []);

  return (
    <View style={styles.container}>
      {hasPermission ? (
        device != null ? (
          <Camera
            style={styles.camera}
            isActive={true}
            device={device}
            frameProcessor={frameProcessor}
          />
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Your phone does not have a {position} Camera.
            </Text>
          </View>
        )
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={5}>
            FaceBlurApp needs Camera permission.{' '}
            <Text style={styles.link} onPress={Linking.openSettings}>
              Grant
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    maxWidth: '60%',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  link: {
    color: 'rgb(80, 80, 255)',
  },
});

export default App;
