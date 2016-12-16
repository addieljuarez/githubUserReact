// var React = require('react-native');

import React, { Component } from 'react';
var api = require('../Utils/api');
var Dashboard = require('../Component/Dashboard');

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	ActivityIndicator,
	TextInput,
	handleChange,
} from 'react-native';

class Main extends React.Component{

	constructor(props) {
	  super(props);

	  this.state = {
	  	username : '',
	  	isLoading : false,
	  	error : false,
	  };
	}

	handleChange(event){
		this.setState({
			username : event.nativeEvent.text
		});
	}

	handleSubmit(){
		console.log('Submit= ', this.state.username);
		this.setState({
			isLoading : true
		});
		api.getBio(this.state.username)
			.then((res) => {
				if(res.message === 'Not Found'){
					console.log('NO encotrado la conexion');
					this.setState({
						error : 'User not found',
						isLoading : false
					});
				}else{

					console.log(res);

					this.props.navigator.push({
						title : res.name || "select an option",
						component : Dashboard,
						passProps : {userInfo : res},
					});
					this.setState({
						isLoading : false,
						error : false,
						username : '',
					});
				}
			})

	}

	render(){

		var showErr = (
			this.state.error ? <Text> {this.state.error} </Text> : <View></View>
		);

		return(
			<View style={styles.mainContainer}>
				<Text style={styles.title }> Search for github username</Text>
				<TextInput
					style={styles.searchInput}
					value={this.state.username}
					onChange={this.handleChange.bind(this)} />

				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="white">
					<Text
						style={styles.buttonText}>
						Search
					</Text>
				</TouchableHighlight>


				<ActivityIndicator 
					animating ={this.state.isLoading}
					color ='#111'
					size='large' />
				{showErr}
			</View>

		)
	}
}

const styles = StyleSheet.create({
	mainContainer : {
		flex : 1,
		padding : 30,
		marginTop : 65,
		flexDirection : 'column',
		justifyContent : 'center',
		// alignItems : 'center',
		backgroundColor : '#48bbec',
	},
	title : {
		marginBottom : 20,
		fontSize : 25,
		textAlign : 'center',
		color : '#fff'
	},
	searchInput : {
		height : 50,
		padding : 4,
		marginRight : 5,
		fontSize : 23,
		borderWidth : 1,
		borderColor : 'white',
	},
	buttonText : {
		fontSize : 18,
		color : '#111',
		alignSelf : 'center'
	},
	button : {
		height : 45,
		flexDirection : 'row',
		backgroundColor : 'white',
		borderColor : 'white',
		borderWidth : 1,
		borderRadius : 8,
		marginBottom : 10,
		marginTop : 10,
		alignSelf : 'stretch',
		justifyContent : 'center',
	}
});


module.exports = Main;
