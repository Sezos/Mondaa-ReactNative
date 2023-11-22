/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ProviderContext} from '../../provider/Provider';
import Header from '../../components/Header';
import services from '../../services/service';
import {Text} from 'react-native-paper';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import JobList from '../../components/manager/JobList';

const UserHomeScreen = ({navigation}) => {
  const provider = useContext(ProviderContext);
  const styles = useStyles();

  const [projectJSON, setProjectJSON] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    _fetchData();
  }, [provider.selectedDate]);

  const _fetchData = async () => {
    try {
      setIsLoading(true);
      const {data} = await services.getProjectByDate({
        date: provider.selectedDate,
      });
      setProjectJSON(data);
    } catch (error) {
      console.log('Error fetching data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const _handlPress = data => {
    navigation.navigate('JobScreen', {data: data});
  };
  return (
    <View style={[StyleSheet.absoluteFill, {paddingHorizontal: 15}]}>
      <Header {...provider.userData} />
      <View style={styles.body}>
        <Text
          allowFontScaling={false}
          variant="headlineMedium"
          style={{marginVertical: 10}}>
          Your Jobs:
        </Text>
        <Text>{provider.selectedDate}</Text>
        <JobList
          data={projectJSON}
          isRefreshing={isLoading}
          fetchData={_fetchData}
          onPress={_handlPress}
        />
      </View>
    </View>
  );
};
const useStyles = () => {
  return StyleSheet.create({
    body: {
      flex: 1,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginVertical: 5,
    },
    image: {
      width: 50,
      height: 50,
    },
    subContainer: {
      flex: 1,
      marginLeft: 16,
    },
    jobName: {
      fontSize: 16.5,
      color: COLOR_PALETTE.textColor,
      fontFamily: FONTS.medium,
    },
    infoTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 7,
    },
    infoText: {
      fontSize: 13,
      color: COLOR_PALETTE.textColor,
      fontFamily: FONTS.regular,
    },
  });
};

export default UserHomeScreen;
