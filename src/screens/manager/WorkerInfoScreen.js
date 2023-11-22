import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import {Avatar, Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/ScreenHeader';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {ProviderContext} from '../../provider/Provider';
import services from '../../services/service';
import {SheetManager} from 'react-native-actions-sheet';
import {useToast} from 'react-native-toast-notifications';

const UserInfo = ({icon, title, caption}) => {
  const styles = useStyles();

  return (
    <View style={styles.userInfoContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={icon} size={18} color="#B7B7B6" />
        <Text allowFontScaling={false} style={styles.userInfoTitle}>
          {title}
        </Text>
      </View>
      <Text allowFontScaling={false} style={styles.userInfoCaption}>
        {caption}
      </Text>
    </View>
  );
};

const WorkerInfoScreen = ({navigation, route}) => {
  const styles = useStyles();
  const userData = route.params.data;
  const provider = useContext(ProviderContext);
  const toast = useToast();
  const [datas, setDatas] = useState({isReviewed: userData.isReviewed === 1});
  const [isLoading, setIsLoading] = useState(false);
  const [rate, setRate] = useState(userData.rate);

  const zuragURL = 'https://mondaa-test.s3.ap-east-1.amazonaws.com/';

  const _handleVerify = async () => {
    try {
      setIsLoading(true);
      await services.updateEmployeeInfo(userData.id, {
        isReviewed: datas.isReviewed === true ? 0 : 1,
      });
      setDatas({...datas, isReviewed: !datas.isReviewed});
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const _handleBlock = async () => {
    try {
      setIsLoading(true);
      await services.updateEmployeeInfo(userData.id, {
        status: 'Suspended',
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  };

  const updateData = async title => {
    const result = await SheetManager.show('UserInfoSheet', {
      payload: rate,
    });

    if (result) {
      const newData = {...userData};
      newData[title] = result;
      setDatas({...newData});

      const {data} = await services.updateEmployeeInfo(userData.id, {
        rate: parseInt(result, 10),
      });

      if (data.status === 'Verified') {
        setRate(result);
      }

      toast.show('Updated Successfully!', {
        type: 'success',
      });
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <ScreenHeader
        title="Worker Information"
        onPress={() => navigation.goBack()}
      />
      <GestureHandlerRootView>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.headerContainer}>
              <View>
                {provider.userData.role === 'Manager' ? (
                  <View>
                    <Button
                      style={{
                        position: 'absolute',
                        left: 2,
                        top: 2,
                        borderWidth: 1,
                        borderColor: 'black',
                      }}
                      disabled={isLoading}
                      onPress={_handleVerify}>
                      {datas.isReviewed === true ? 'Unconfirm' : 'Confirm'}
                    </Button>
                    <Button
                      style={{
                        position: 'absolute',
                        right: 2,
                        top: 2,
                        borderWidth: 1,
                        borderColor: 'red',
                      }}
                      disabled={isLoading}
                      onPress={_handleBlock}>
                      {datas.status === 'Suspended' ? 'UnBlock' : 'Block'}
                    </Button>
                  </View>
                ) : (
                  <View></View>
                )}

                <Avatar.Image
                  source={
                    userData.avatar
                      ? {uri: zuragURL + userData.avatar}
                      : require('../../assets/avatar.png')
                  }
                  style={styles.headerAvatar}
                  size={80}
                />
                <Text allowFontScaling={false} style={styles.headerName}>
                  {`${userData.firstName} ${userData.lastName}`}
                </Text>
                <View style={styles.headerRoleContainer}>
                  <Text allowFontScaling={false} style={styles.headerRole}>
                    {`${userData.role}`}
                  </Text>
                </View>
              </View>
              <View style={styles.headerActionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${userData.phone}`);
                  }}>
                  <View style={styles.headerAction}>
                    <Icon
                      name="call-outline"
                      size={16}
                      color={COLOR_PALETTE.textColor}
                    />
                    <Text
                      allowFontScaling={false}
                      style={styles.headerActionTitle}>
                      Call
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`sms:${userData.phone}`);
                  }}>
                  <View style={styles.headerAction}>
                    <Icon
                      name="mail-outline"
                      size={16}
                      color={COLOR_PALETTE.textColor}
                    />
                    <Text
                      allowFontScaling={false}
                      style={styles.headerActionTitle}>
                      Message
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.headerContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 15,
                  marginBottom: 10,
                }}>
                Info
              </Text>
              <UserInfo
                icon="call-outline"
                title="Phone Number"
                caption={userData.phone}
              />
              <UserInfo
                icon="mail-outline"
                title="Email"
                caption={userData.email}
              />
              {provider.userData.role === 'Manager' ? (
                <TouchableOpacity onPress={() => updateData('rate')}>
                  <View style={styles.item}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text allowFontScaling={false} style={styles.itemCaption}>
                        Rate
                      </Text>
                    </View>
                    <Text
                      allowFontScaling={false}
                      style={styles.itemValue}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {userData.rate ? userData.rate : '-'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
            </View>
            <View style={styles.headerContainer}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 15,
                  marginBottom: 10,
                }}>
                Emergency contact
              </Text>
              <UserInfo
                icon="person-outline"
                title="Name"
                caption={userData.emergencyName}
              />
              <UserInfo
                icon="call-outline"
                title="Phone number"
                caption={userData.emergencyPhone}
              />
              <UserInfo
                icon="mail-outline"
                title="Email"
                caption={userData.emergencyEmail}
              />
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    body: {
      flex: 1,
      paddingHorizontal: 15,
    },
    headerContainer: {
      backgroundColor: '#fff',
      marginTop: 20,
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    headerAvatar: {
      alignSelf: 'center',
    },
    headerName: {
      fontSize: 18,
      fontFamily: FONTS.semiBold,
      color: COLOR_PALETTE.textColor,
      alignSelf: 'center',
      marginVertical: 5,
    },
    item: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerRoleContainer: {
      backgroundColor: '#BDB9FF',
      alignSelf: 'center',
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: 20,
    },
    headerRole: {
      fontSize: 13,
      fontFamily: FONTS.regular,
      color: '#fff',
    },
    headerActionContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    headerAction: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#D1CFCF',
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      marginTop: 10,
    },
    headerActionTitle: {
      fontSize: 14,
      fontFamily: FONTS.regular,
      marginLeft: 5,
      color: COLOR_PALETTE.textColor,
    },
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    userInfoTitle: {
      color: '#B7B7B6',
      fontFamily: FONTS.regular,
      fontSize: 15,
      marginLeft: 5,
      textAlign: 'left',
    },
    userInfoCaption: {
      flex: 1,
      color: COLOR_PALETTE.textColor,
      fontFamily: FONTS.regular,
      fontSize: 15,
      textAlign: 'right',
    },
  });
};

export default WorkerInfoScreen;
