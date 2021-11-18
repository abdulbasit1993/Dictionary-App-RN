import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const Header = props => {
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#4997EC',
    width: deviceWidth,
    padding: 15,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
