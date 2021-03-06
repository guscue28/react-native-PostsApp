import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


const Loading = ({ loading, children }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return children;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Loading;

/*
*Component
*prop loading
*
 */