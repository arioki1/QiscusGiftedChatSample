/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

import React from 'react';
import {Image, View} from 'react-native';
import * as Qiscus from '../Services/qiscus';
import TextPrimary from '../Coomponent/Text/TextPrimary';

//TODO
class ListContactScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      dataUsers: {},
    };
  }
  componentDidMount() {
    this.getContact();
  }

  getContact = (searchQuery = '', page = 1, limit = 50) => {
    Qiscus.qiscus
      .getUsers(searchQuery, page, limit)
      .then(dataUsers => {
        this.setState({dataUsers});
      })
      .catch(function(error) {
        error;
        // On error
      });
  };
  renderListContacts = users => {
    return users.map(user => (
      <View>
        <TextPrimary text={user.name !== '' ? user.name : user.email} />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: user.avatar_url}}
        />
      </View>
    ));
  };
  render() {
    const {dataUsers} = this.state;
    return (
      <View style={{flex: 1}}>
        {dataUsers.users ? (
          this.renderListContacts(dataUsers.users)
        ) : (
          <TextPrimary text={'data kosong'} />
        )}
      </View>
    );
  }
}

export default ListContactScreen;
