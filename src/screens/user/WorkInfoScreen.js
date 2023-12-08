import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import {ProviderContext} from '../../provider/Provider';
import {COLOR_PALETTE} from '../../utils/Constants';
import {Button, IconButton} from 'react-native-paper';
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import services from '../../services/service';
import ImagePicker from 'react-native-image-crop-picker';

const fileInputs = [
  {
    label: 'Photo ID (Front)',
    type: 'file',
    isRequired: true,
    name: 'PhotoID',
  },
  {
    label: 'Photo ID (back)',
    type: 'file',
    isRequired: true,
    name: 'PhotoIDBack',
  },
  {
    label: 'White Card (Front)',
    type: 'file',
    isRequired: true,
    name: 'workWhiteCard',
  },
  {
    label: 'White Card (Back)',
    type: 'file',
    isRequired: true,
    name: 'workWhiteCardBack',
  },
  {
    label: 'Any other Cards if applicable',
    type: 'files',
    isRequired: true,
    name: 'OtherCard',
  },
];

const WorkInfoScreen = ({navigation}) => {
  const styles = useStyles();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    _fetchData();
  }, []);

  const handleFile = async name => {
    const result = await ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      loadingLabelText: 'Loading, Please Wait!',
    });
    setIsLoading(true);
    const {data} = await services.uploadImage({
      image: `data:${result.mime};base64,${result.data}`,
      type: name,
    });

    setUserData({...userData, [name]: data});
    setIsLoading(false);
  };

  const _fetchData = async () => {
    const {data} = await services.getUserInfo();
    setUserData(data);
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Image is being uploaded! Please wait</Text>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
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
        <Text style={{marginLeft: 10}}>Work Info</Text>
      </View>
      <View style={styles.body}>
        <Text allowFontScaling={false} style={styles.title}>
          Work Info
        </Text>
        <View style={styles.itemContainer}>
          <GestureHandlerRootView>
            <ScrollView style={{marginBottom: 50}}>
              <TouchableOpacity disabled={true}>
                <View style={styles.item}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="person-outline" size={13} color="#D1CFCF" />
                    <Text allowFontScaling={false} style={styles.itemCaption}>
                      Rate
                    </Text>
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={styles.itemValue}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {userData.rate}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity disabled={true}>
                <View style={styles.item}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="person-outline" size={13} color="#D1CFCF" />
                    <Text allowFontScaling={false} style={styles.itemCaption}>
                      Code
                    </Text>
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={styles.itemValue}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {userData.employeeId}
                  </Text>
                </View>
              </TouchableOpacity>
              {fileInputs.map((field, idx) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleFile(field.name);
                    }}>
                    <View style={styles.item}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="person-outline" size={13} color="#D1CFCF" />
                        <Text
                          allowFontScaling={false}
                          style={styles.itemCaption}>
                          {field.label}
                        </Text>
                      </View>
                      {userData[field.name] ? (
                        <Text>It has been Uploaded.</Text>
                      ) : (
                        <Text>No File Found</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </GestureHandlerRootView>
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
      color: 'black',
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

export default WorkInfoScreen;
