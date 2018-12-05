import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'mobx-react';
import RootStore from './src/stores/rootStore';
import { observable, action } from 'mobx';

type Props = {};
export default class App extends Component<Props> {
  @observable private username = '';
  @observable private password = '';
  @observable private isLoginFailed = false;

  @action
  private handleChangeUsername = (username: string) => {
    this.username = username;
  }

  @action
  private handleChangePassword = (password: string) => {
    this.password = password;
  }

  render() {
    const rootStore = new RootStore();

    const handlePressLogin = () => {

    }
    
    return (
      <Provider rootStore={rootStore}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Icon style={styles.icon} name="list-ul" size={60} color='#8BE9FD' />
            <Text style={styles.title}>To-do List App</Text>
          </View>
          <View style={styles.bottom}>
            <TextInput style={styles.username} placeholder='Username'
            placeholderTextColor='#F8F8F2' underlineColorAndroid='#F8F8F2'
            textContentType='username' secureTextEntry={false}
            value={this.username} onChangeText={this.handleChangeUsername} />
            <TextInput style={styles.password} placeholder='Password'
            placeholderTextColor='#F8F8F2' underlineColorAndroid='#F8F8F2'
            textContentType='password' secureTextEntry={true}
            value={this.password} onChangeText={this.handleChangePassword} />
            <Button color="#8BE9FD"  title="Login" onPress={handlePressLogin} />
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282E36',
  },
  top: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    flexGrow: 1,
    width: 300,
  },
  icon: {
    margin: 16,
  },
  title: {
    color: '#F8F8F2',
  },
  username: {
    color: '#F8F8F2',
    width: 300,
    marginBottom: 24,
  },
  password: {
    color: '#F8F8F2',
    width: 300,
    marginBottom: 48,
  },
});
