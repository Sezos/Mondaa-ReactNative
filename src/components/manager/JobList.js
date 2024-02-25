import React, {useState} from 'react';
import {StyleSheet, FlatList, Alert, RefreshControl} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import JobItem from './JobItem';
import {IconButton} from 'react-native-paper';
import {COLOR_PALETTE} from '../../utils/Constants';
import UserEmptyList from '../EmptyList2';

const rows = [];

const JobList = ({data, isRefreshing, onPress, onDelete, fetchData}) => {
  const styles = useStyles();

  const [prevOpenedRow, setPrevOpenedRow] = useState(null);

  const renderItem = ({item, index}) => {
    return (
      <GestureHandlerRootView>
        <Swipeable
          ref={ref => (rows[index] = ref)}
          friction={2}
          rightThreshold={60}
          onSwipeableOpen={() => _closeRow(index)}
          shouldCancelWhenOutside={true}
          renderRightActions={() => renderHiddenItem(item, index)}>
          <JobItem index={index} item={item} onPress={_pressRow} />
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  const _pressRow = (data, index) => {
    if (prevOpenedRow) prevOpenedRow.close();
    onPress(data);
  };

  const _closeRow = index => {
    if (prevOpenedRow && prevOpenedRow != rows[index]) {
      prevOpenedRow.close();
    }
    setPrevOpenedRow(rows[index]);
  };

  const _delete = async (data, index) => {
    prevOpenedRow.close();
    setPrevOpenedRow(null);
    onDelete(data, index);
  };

  const renderHiddenItem = (data, index) => {
    const _handleAlert = () => {
      Alert.alert('Warning', 'Are you sure about it?', [
        {
          text: 'Yes',
          style: 'default',
          onPress: () => _delete(data, index),
        },
        {
          text: 'No',
          style: 'cancel',
          onPress: () => _closeRow(data, index),
        },
      ]);
    };

    return (
      <IconButton
        icon="delete"
        iconColor="#fff"
        containerColor={COLOR_PALETTE.primaryColor}
        size={20}
        style={styles.deleteButton}
        onPress={_handleAlert}
      />
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      initialNumToRender={10}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
      }
      ListEmptyComponent={() => <UserEmptyList title="Sorry, It's empty!" />}
    />
  );
};

const useStyles = () => {
  return StyleSheet.create({
    deleteButton: {
      width: 40,
      height: 40,
      alignSelf: 'flex-end',
      borderRadius: 10,
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  });
};

export default JobList;
