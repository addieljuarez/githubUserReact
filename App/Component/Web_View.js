import React, {Component} from 'react';

import {
  WebView,
  View,
  StyleSheet,
} from 'react-native';


var styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#f6f6ef',
    flexDirection : 'column',
  }
});

class Web_View extends React.Component{

  render(){
    return(
      <View style={styles.container}>
        <WebView
          source={{uri : this.props.url}} />
      </View>
    )
  }

}

// Web_View.propTypes = {
//   uri : React.PropTypes.string.isRequired,
// }

module.exports = Web_View;
