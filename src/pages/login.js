import React, { Component } from 'react';

import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import { StackActions, NavigationActions } from 'react-navigation'
import timeLine from './timeLine';

export default class Login extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    username: ''
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Twitter:username')
    if (username)
      this.navigateToTimeline
  }

  handleInputChange = username => {
    this.setState({ username })

  }

  navigateToTimeline = () => {
    const resetActions = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'timeLine' })]
    })
    this.props.navigation.dispatch(resetActions)
  }


  handleLogin = async () => {
    const { username } = this.state;
    if (!username.length) return
    await AsyncStorage.setItem('@Twitter:username', username)
    this.navigateToTimeline()

  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}
        behavior='padding'>
        <View style={styles.content}>
          <Icon name="twitter" size={64} color="#4bb0ee" />
          <TextInput
            style={styles.input}
            placeholder="Nome de Usuario"
            value={this.state.username}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleLogin} />
          <TouchableOpacity style={styles.button}
            onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
