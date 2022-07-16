import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = props =>
  props.status && (
    <View style={styles.container} {...props}>
      <ActivityIndicator size="large" color="#2574FF" />
    </View>
  );

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '90%',
    zIndex: 10,
    elevation: 10,
  },
});