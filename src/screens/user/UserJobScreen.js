import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  Linking,
  Alert,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import services from '../../services/service';
import WorkerItem from '../../components/manager/WorkerItem';
import UserEmptyList from '../../components/EmptyList2';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import Clipboard from '@react-native-clipboard/clipboard';
import Geocoder from 'react-native-geocoding';

const UserJobScreen = ({navigation, route}) => {
  const styles = useStyles();
  const [userJSON, setUserJSON] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const project = route.params.data.ProjectLocation;
  const [geoPoint, setGeoPoint] = useState({});

  useEffect(() => {
    _fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  Geocoder.init('AIzaSyAedG3JXI5i_r51I9Mydkb5SwRiQkOuiAo', {language: 'en'});
  const _fetchData = async () => {
    Geocoder.from(project.location)
      .then(json => {
        var location = json.results[0].geometry.location;
        setGeoPoint(location);
      })
      .catch(error => console.warn(error));
    setIsLoading(true);
    try {
      const {data} = await services.getProjectWorker(route.params.data.id);
      setUserJSON(data.ProjectUsers);
    } catch (error) {
      console.log('error fetching job', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openInMaps = type => {
    if (type === 'ios') {
      return Linking.openURL(
        `http://maps.apple.com/?q=${geoPoint.lat},${geoPoint.lng}`,
      );
    } else if (type === 'android') {
      return Linking.openURL(
        `https://google.com/maps/place/${geoPoint.lat},${geoPoint.lng}`,
      );
    } else {
      Alert.alert('Copy Address', 'The address has been copied', [
        {
          text: 'Okay',
          style: 'default',
        },
      ]);
      return Clipboard.setString(project.location);
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <View
        style={{
          height: 60,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <IconButton
          icon="arrow-left"
          iconColor="#04092199"
          size={18}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={{marginLeft: 10}}>{project.name}</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: 50,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Button
          onPress={() => {
            openInMaps('ios');
          }}>
          Apple Maps
        </Button>
        <Button
          onPress={() => {
            openInMaps('android');
          }}>
          Google Maps
        </Button>
        <Button
          onPress={() => {
            openInMaps('clipboard');
          }}>
          Copy
        </Button>
      </View>
      <View style={{flex: 1, paddingHorizontal: 15}}>
        {userJSON.length > 0 ? (
          <Text
            allowFontScaling={false}
            style={{
              marginVertical: 10,
              fontSize: 12,
              fontFamily: FONTS.regular,
              color: COLOR_PALETTE.textColor,
            }}>
            Total: {userJSON.length} Worker
          </Text>
        ) : null}
        <FlatList
          data={userJSON}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <WorkerItem isWorker={true} item={item.User} />
          )}
          initialNumToRender={10}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={_fetchData} />
          }
          ListEmptyComponent={() => (
            <UserEmptyList title="Sorry, It's empty!" />
          )}
        />
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    backButton: {
      backgroundColor: '#0409210A',
      borderRadius: 10,
      height: 30,
      width: 35,
    },
    floatButton: {
      width: 50,
      height: 50,
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });
};

export default UserJobScreen;
