import React from 'react';
import {Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';

const Header = ({navigation, name, Extra}) => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton
            icon="arrow-left"
            iconColor="#04092199"
            size={18}
            onPress={() => navigation.goBack()}
            // style={styles.backButton}
          />
          <Text>{name}</Text>
        </View>
        {Extra ? <Extra /> : <></>}
      </View>
    </View>
  );
};

export default Header;
