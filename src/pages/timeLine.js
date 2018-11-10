import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import api from '../services/api'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tweet from '../components/tweet'
import Socket from 'socket.io-client'

export default class timeLine extends Component {

    state = {
        tweets: []
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Inicio',
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('newTweet')}>
                <Icon style={{ marginRight: 20 }}
                    name="add-circle-outline"
                    size={24}
                    color="#4bb0ee"></Icon>
            </TouchableOpacity>
        )
    })



    async componentDidMount() {
        const response = await api.get('tweets')
        this.setState({ tweets: response.data })
        this.subscribeToEvents()
    }

    subscribeToEvents = () => {
        const io = Socket('http://192.168.0.105:3000')
        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] })
        })

        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(
                    tweet => (tweet._id === data._id ? data : tweet)
                )
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={({ item }) => <Tweet tweet={item} />}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
