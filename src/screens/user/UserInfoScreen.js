import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {ProviderContext} from '../../provider/Provider';
import services from '../../services/service';
import {COLOR_PALETTE} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {SheetManager} from 'react-native-actions-sheet';
import {useToast} from 'react-native-toast-notifications';

const UserInfoScreen = ({navigation}) => {
  const styles = useStyles();
  // const provider = useContext(ProviderContext);
  const toast = useToast();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    const {data} = await services.getUserInfo();
    setUserData(data);
  };

  const updateData = async title => {
    const result = await SheetManager.show('UserInfoSheet', {
      payload: userData[title],
    });
    if (result) {
      const newData = {...userData};
      newData[title] = result;
      setUserData({...newData});
      const {data} = await services.setUserInfo(newData);
      if (data.status === 'Verified')
        toast.show('Updated Successfully!', {
          type: 'success',
        });
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.headerContainer}>
        <IconButton
          icon="arrow-left"
          iconColor="#04092199"
          size={18}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={{marginLeft: 10}}>Personal Information</Text>
      </View>
      <View style={styles.body}>
        <Text allowFontScaling={false} style={styles.title}>
          Info
        </Text>
        <View style={styles.itemContainer}>
          <TouchableOpacity disabled={true}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="person-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  First Name
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {userData.firstName ? userData.firstName : '-'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity disabled={true}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="people-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  Last Name
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {userData.lastName ? userData.lastName : '-'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          Contact Info
        </Text>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => updateData('phone')}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="call-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  Phone Number
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {userData.phone ? userData.phone : '-'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateData('email')}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="mail-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  Email
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {userData.email ? userData.email : '-'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateData('address')}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="location-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  Address
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {userData.address ? userData.address : '-'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text allowFontScaling={false} style={styles.title}>
          Emergency Contact
        </Text>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => updateData('emergencyName')}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="location-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  Name
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {userData.emergencyName ? userData.emergencyName : '-'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateData('emergencyPhone')}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="call-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  Phone
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {userData.emergencyPhone ? userData.emergencyPhone : '-'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateData('emergencyEmail')}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="mail-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  Email
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {userData.emergencyEmail ? userData.emergencyEmail : '-'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    headerContainer: {
      height: 60,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      backgroundColor: '#0409210A',
      borderRadius: 10,
      height: 30,
      width: 35,
    },
    body: {
      flex: 1,
      paddingHorizontal: 15,
      marginTop: 10,
    },
    itemContainer: {
      backgroundColor: '#fff',
      marginVertical: 5,
      borderRadius: 10,
    },
    item: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 18,
      color: COLOR_PALETTE.textColor,
      marginTop: 10,
    },
    itemCaption: {
      fontSize: 14,
      color: '#D1CFCF',
      marginLeft: 5,
    },
    itemValue: {
      flex: 1,
      fontSize: 14,
      color: COLOR_PALETTE.textColor,
      textAlign: 'right',
      marginLeft: 30,
    },
  });
};

export default UserInfoScreen;
