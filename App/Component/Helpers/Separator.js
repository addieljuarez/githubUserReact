import React, {Component} from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  separator : {
    height : 1,
    backgroundColor : '#e4e4e4',
    flex : 1,
    marginLeft : 15,
  }
});


class Separator extends React.Component{
  render(){
    return(
      <View style={styles.separator}></View>
    )
  }
}

module.exports = Separator;
