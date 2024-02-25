import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ProviderContext} from '../../provider/Provider';
import Header from '../../components/Header';
import UserEmptyList from '../../components/EmptyList2';
import services from '../../services/service';

const LeaderHomeScreen = () => {
  const provider = useContext(ProviderContext);
  const styles = useStyles();

  const [projectJSON, setProjectJSON] = useState([]);

  useEffect(() => {
    _fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _fetchData = async () => {
    try {
      const {data} = await services.getProjectByDate({
        date: provider.selectedDate,
      });
      setProjectJSON(data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  return (
    <View style={[StyleSheet.absoluteFill, {paddingHorizontal: 15}]}>
      <Header {...provider.userData} />
      <View style={styles.body}>
        <FlatList
          data={projectJSON}
          ListEmptyComponent={() => <UserEmptyList />}
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
  });
};

export default LeaderHomeScreen;
