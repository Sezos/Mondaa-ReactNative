import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {ProviderContext} from '../../provider/Provider';
import {Avatar, Divider} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import services from '../../services/service';

const UserProfileScreen = ({navigation}) => {
  const styles = useStyles();
  const provider = useContext(ProviderContext);
  const toast = useToast();
  const zuragURL =
    'https://scontent.fsyd12-1.fna.fbcdn.net/v/t39.30808-6/304834509_535131748616627_7084528645270394390_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ekg7S1Z3-6UAX8tKlfi&_nc_ht=scontent.fsyd12-1.fna&oh=00_AfAlkOI1A2-s-dZFMKYHiRs1TW8V0pCytKWIDSQAAKD1MQ&oe=64ED8B55';
  const _handleLogout = () => {
    Alert.alert('Warning', 'Are you Sure?', [
      {
        text: 'Yes',
        onPress: () => {
          provider.setIsLoggedIn(false);
        },
        style: 'default',
      },
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  };

  const _profileSelect = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: false,
        includeBase64: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
        loadingLabelText: 'Loading, Please Wait!',
      });

      const {data} = await services.setAvatar({
        image: `data:${result.mime};base64,${result.data}`,
      });

      if (data.success) {
        provider.setAvatar(`data:${result.mime};base64,${result.data}`);
        toast.show('Picture was updated successfully', {type: 'success'});
      }
    } catch (error) {
      console.error('Error changing profile', error);
    }
  };

  return (
    <View style={[StyleSheet.absoluteFill, {paddingHorizontal: 15}]}>
      <TouchableOpacity onPress={_profileSelect}>
        <Avatar.Image
          source={{
            uri: provider.userData.avatar
              ? 'https://mondaa-test.s3.ap-east-1.amazonaws.com/' +
                provider.userData.avatar
              : zuragURL,
          }}
          size={150}
          style={{alignSelf: 'center', marginTop: 30}}
        />
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserInfoScreen')}>
            <View style={styles.item}>
              <Text allowFontScaling={false} style={{color: 'black'}}>
                Personal Info
              </Text>
              <Icon name="chevron-right" size={18} />
            </View>
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity
            onPress={() => navigation.navigate('BankInfoScreen')}>
            <View style={styles.item}>
              <Text allowFontScaling={false} style={{color: 'black'}}>
                Bank
              </Text>
              <Icon name="chevron-right" size={18} />
            </View>
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity
            onPress={() => navigation.navigate('WorkInfoScreen')}>
            <View style={styles.item}>
              <Text allowFontScaling={false} style={{color: 'black'}}>
                Work Info
              </Text>
              <Icon name="chevron-right" size={18} />
            </View>
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <TouchableOpacity
            onPress={() => navigation.navigate('TimesheetScreen')}>
            <View style={styles.item}>
              <Text allowFontScaling={false} style={{color: 'black'}}>
                Time Sheet
              </Text>
              <Icon name="chevron-right" size={18} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('WorkerScreen')}>
            <View style={styles.item}>
              <Text allowFontScaling={false} style={{color: 'black'}}>
                Employees
              </Text>
              <Icon name="chevron-right" size={18} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={_handleLogout}>
          <View style={styles.item}>
            <Text allowFontScaling={false} style={{color: 'black'}}>
              Log out
            </Text>
            <Icon name="chevron-right" size={18} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    body: {
      flex: 1,
    },
    itemContainer: {
      backgroundColor: '#fff',
      marginVertical: 10,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingVertical: 15,
    },
    divider: {
      width: '95%',
      backgroundColor: 'lightgray',
      alignSelf: 'center',
    },
  });
};

export default UserProfileScreen;
