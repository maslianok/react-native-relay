import React, { Component, PropTypes } from 'react';
import Relay, {
  Route,
  RootContainer,
  DefaultNetworkLayer
} from 'react-relay'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

Relay.injectNetworkLayer(new DefaultNetworkLayer('http://localhost:4000/graphql'));

class HomeRoute extends Route{
    static routeName = 'Home';
    static queries = {
        store: (Component) => Relay.QL`
            query MainQuery{
                store { ${Component.getFragment('store')} }
            }
        `
    }
}

class UserInfo extends React.Component {
    static propTypes = {
        limit: PropTypes.number.isRequired,
        store: PropTypes.object.isRequired,
    };
    static defaultProps = {
        limit: 10
    };

    render() {
        let {store, limit} = this.props;
        return <Text>{store.links.slice(0, limit).map(l => <Text key={l._id}>{l.title}</Text>)}</Text>;
    }
}

UserInfo = Relay.createContainer(UserInfo, {
    fragments: {
        store: () => Relay.QL`
        fragment on Store{
            links{_id, title, url}
        }`
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


class RelayApp extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <RootContainer
          Component={UserInfo}
          route={new HomeRoute()}
          renderLoading={() => <Text>Loading...</Text>}
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('RelayApp', () => RelayApp);
