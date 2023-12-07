import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import ContextMenu from 'react-native-context-menu-view';
import {COLOR_PALETTE, FONTS} from '../utils/Constants';
import {
  GestureHandlerRootView,
  RefreshControl,
  ScrollView,
} from 'react-native-gesture-handler';
import {IconButton, Icon, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import services from '../services/service';
import {ProviderContext} from '../provider/Provider';
import {socket} from '../utils/socket';
import UserEmptyList from '../components/EmptyList2';
import {SheetManager} from 'react-native-actions-sheet';

const FilesScreen = ({route, navigation}) => {
  const provider = useContext(ProviderContext);
  const [files, setFiles] = useState([]);
  const [isRefreshing, SetIsRefreshing] = useState(0);
  const params = route.params;

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetch = async () => {
    SetIsRefreshing(1);
    const {data} = await services.getFiles(params?.id || 1);

    setFiles(
      data.sort((a, b) => {
        if (a.isFolder < b.isFolder) {
          return 1;
        }
        if (a.isFolder > b.isFolder) {
          return -1;
        }
        return a.name.localeCompare(b.name);
      }),
    );

    SetIsRefreshing(0);
  };
  const deleteFile = async id => {
    Alert.alert(
      'Are you sure?',
      'You can not bring back deleted items. Please be careful. ',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await services.deleteFile(id);
            fetch();
          },
          style: 'destructive',
        },
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          display: 'flex',
          width: '100%',
          marginBottom: 10,
          justifyContent: 'flex-start',
        }}>
        {item.isFolder ? (
          <ContextMenu
            actions={[{title: 'Delete', destructive: true}]}
            onPress={() => {
              deleteFile(item.id);
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.push('FilesScreen', {id: item.id, name: item.name});
              }}
              contentStyle={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
              style={{
                backgroundColor: 'white',
                height: 50,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                display: 'flex',
              }}>
              <Icon source={'folder'} size={40} color="blue" />
              <Text>{' ' + item.name}</Text>
            </TouchableOpacity>
          </ContextMenu>
        ) : (
          <ContextMenu
            actions={[{title: 'Delete', destructive: true}]}
            onPress={() => {
              deleteFile(item.id);
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.push('FileInfo', {id: item.id});
              }}
              contentStyle={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
              style={{
                backgroundColor: 'white',
                height: 50,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                display: 'flex',
              }}>
              <Text> </Text>
              <Image
                source={{
                  uri:
                    'https://mondaa-test.s3.ap-east-1.amazonaws.com/' +
                    (item.thumbnail_url || item.url),
                }}
                style={{
                  width: 30,
                  height: 30,
                  paddingRight: 10,
                  borderRadius: 5,
                }}
              />
              <Text>{' ' + item.name}</Text>
            </TouchableOpacity>
          </ContextMenu>
        )}
      </View>
    );
  };

  const create = async e => {
    // e.nativeEvent.index = 0 for File, 1 for Folder
    if (e.nativeEvent.index === 0) {
      await SheetManager.show('UploadFileSheet', {
        payload: {
          parentId: params?.id || 1,
        },
      });
    } else {
      await SheetManager.show('CreateFolderSheet', {
        payload: {
          parentId: params?.id || 1,
        },
      });
    }
    fetch();
  };

  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <View style={{marginBottom: 100}}>
        <Header
          navigation={navigation}
          name={params?.name || 'Files'}
          onPress={create}
        />
        <GestureHandlerRootView>
          <FlatList
            style={{height: '100%', margin: 20}}
            data={files}
            renderItem={renderItem}
            ItemSeparatorComponent={() =>
              files.length > 0 && (
                <Divider
                  style={{backgroundColor: COLOR_PALETTE.dividerColor}}
                />
              )
            }
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={fetch} />
            }
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <UserEmptyList title="Sorry, It's empty!" />
            )}
          />
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

const Header = ({navigation, name, onPress}) => {
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
        <ContextMenu
          actions={[{title: 'File'}, {title: 'Folder'}]}
          dropdownMenuMode={true}
          onPress={onPress}>
          <IconButton icon="plus" />
        </ContextMenu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ChatSection: {
    image: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    rightSide: {display: 'flex', flexDirection: 'row'},
    lastChat: {
      color: 'gray',
    },
    date: {
      color: 'gray',
      paddingLeft: 10,
    },
    title: {
      paddingBottom: 10,
      fontSize: 20,
      fontFamily: FONTS.regular,
    },
    Body: {
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftSide: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  header: {
    fontSize: 22,
    marginVertical: 10,
    fontFamily: FONTS.bold,
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: COLOR_PALETTE.backgroundColor,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  forgotPassword: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    alignSelf: 'flex-end',
    color: '#2167D2',
  },
  button: {
    width: '75%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonLabel: {
    fontSize: 13,
    fontFamily: FONTS.bold,
  },
  infoLabelContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infoLabel: {
    fontSize: 11,
    marginHorizontal: 15,
    fontFamily: FONTS.regular,
  },
  divider: {
    width: '25%',
    backgroundColor: 'darkgray',
  },
});

export default FilesScreen;
