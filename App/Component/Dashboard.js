import React, { Component } from 'react';
var Profile = require('./Profile');
var Repositories = require('./Repositories');
var api = require('../Utils/api');


import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
  Image,
  TouchableHighlight
} from 'react-native';


class Dashboard extends React.Component{

	makeBackground(btn){

		var obj = {
			flexDirection : 'row',
			alignSelf : 'stretch',
			justifyContent : 'center',
			flex : 1
		}

		if(btn === 0){
			obj.backgroundColor = '#48bbec'
		}else if(btn === 1){
			obj.backgroundColor = '#e77aae'
		}else{
			obj.backgroundColor = '#758bf4'
		}

		return obj;

	}

	goToProfile(){

		// console.log('perfil');
		this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',
      passProps: {userInfo: this.props.userInfo}
    })
	}

	goToRepos(){
		// console.log('repos');

		console.log('el login: ', this.props.userInfo.login);

		api.getRepos(this.props.userInfo.login)
			.then((jsonRes) => {
				console.log('el res del JSONResp: ', jsonRes);

				this.props.navigator.push({
					component : Repositories,
					title : 'Repos',
					passProps : {
						userInfo : this.props.userInfo,
						repos : jsonRes
					}
				})
			})



	}

	goToNotes(){
		console.log('notas');
	}




  render(){
    return(
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />


				<TouchableHighlight
					style={this.makeBackground(0)}
					onPress={this.goToProfile.bind(this)}
					underlayColor='#88d4f5'>
					<Text style={styles.buttonText}>Ver perfil</Text>
				</TouchableHighlight>



				<TouchableHighlight
					style={this.makeBackground(1)}
					onPress={this.goToRepos.bind(this)}
					underlayColor='#88d4f5'>
					<Text style={styles.buttonText}>Ver repos</Text>
				</TouchableHighlight>




				<TouchableHighlight
					style={this.makeBackground(2)}
					onPress={this.goToNotes.bind(this)}
					underlayColor='#88d4f5'>
					<Text style={styles.buttonText}>Ver Notas</Text>
				</TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container :{
    marginTop : 65,
    flex : 1,
  },
  image : {
    height : 350,
		//width : 350,
  },
  buttonText : {
    fontSize : 24,
    color : 'white',
    alignSelf : 'center',
  }
});

module.exports = Dashboard;
