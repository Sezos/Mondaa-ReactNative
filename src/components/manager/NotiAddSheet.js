/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  Button,
  Divider,
  TextInput,
} from 'react-native-paper';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import services from '../../services/service';
import JobAddWorkerItem from './JobAddWorkerItem';

const sortWorkers = (first, second) => {
  if (first.role[0] > second.role[0]) {
    return -1;
  }
  if (first.role[0] === second.role[0]) {
    return first.firstName.localeCompare(second.firstName);
  }
  if (first.role[0] < second.role[0]) {
    return 1;
  }
};

const NotiAddSheet = props => {
  const styles = useStyles();
  const [employees, setEmployees] = useState(props.payload);
  const [searchValue, setSearchValue] = useState('');
  const [allJSON, setAllJSON] = useState([]);
  const [json, setJSON] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    _onOpen();
  }, []);

  const _onOpen = async () => {
    setLoading(true);
    try {
      const {data} = await services.getEmployees();
      setAllJSON(data);
      setJSON(
        data.map(emp => {
          emp.selected = props.payload.includes(emp.id);
          return emp;
        }),
      );
    } catch (error) {
      console.log('Error getting employees', error);
    } finally {
      setLoading(false);
    }
  };

  const _handlePress = async data => {
    if (!selectedEmp.map(e => e.id).includes(data.id)) {
      setSelectedEmp(selectedEmp.concat(data));
    } else {
      setSelectedEmp(selectedEmp.filter(e => data.id !== e.id));
    }
  };

  const _handleSave = async () => {
    if (selectedEmp !== -1) {
      const lel = selectedEmp.map(selected => selected.id);
      const added = lel.filter(item => !employees.includes(item));
      const removed = lel.filter(item => employees.includes(item));
      await SheetManager.hide(props.sheetId, {
        payload: {added, removed},
      });
    }
  };

  const _handleSearch = value => {
    setSearchValue(value);
    let result = [];
    if (value.length >= 3) {
      result = allJSON.filter(element => {
        if (element.firstName.toLowerCase().includes(value.toLowerCase())) {
          return element;
        }
      });
      if (result.length === 0) {
        setJSON([]);
      } else setJSON(result);
    } else if (value.length === 0) {
      setJSON(allJSON);
    }
  };

  return (
    <ActionSheet
      id={props.sheetId}
      useBottomSafeAreaPadding={true}
      closable={true}
      drawUnderStatusBar={true}
      containerStyle={{paddingHorizontal: 15}}
      headerAlwaysVisible={true}
      statusBarTranslucent={true}
      closeOnPressBack={false}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color={COLOR_PALETTE.primaryColor}
            size="small"
          />
          <Text allowFontScaling={false} style={styles.loadingText}>
            Loading, Please wait!
          </Text>
        </View>
      ) : (
        <View style={{height: '95%'}}>
          <View style={styles.inputContainer}>
            <Icon name="search" size={22} color="#6D6B7E" />
            <TextInput
              value={searchValue}
              onChangeText={_handleSearch}
              mode="contained"
              placeholder="Search employee"
              textColor={COLOR_PALETTE.textColor}
              placeholderTextColor="lightgray"
              activeUnderlineColor={COLOR_PALETTE.primaryColor}
              underlineColor="darkgray"
              returnKeyType="done"
              style={styles.input}
            />
          </View>
          <FlatList
            data={json.sort(sortWorkers)}
            renderItem={({item, index}) => (
              <JobAddWorkerItem item={item} onPress={_handlePress} />
            )}
            ItemSeparatorComponent={() =>
              json.length > 0 && (
                <Divider
                  style={{backgroundColor: COLOR_PALETTE.dividerColor}}
                />
              )
            }
            ListEmptyComponent={() => {
              if (searchValue.length >= 3) return <Text>No result!</Text>;
              else return <Text>List is Empty</Text>;
            }}
          />
          <Button
            mode="contained"
            style={styles.button}
            contentStyle={{height: 45}}
            labelStyle={styles.buttonLabel}
            textColor={COLOR_PALETTE.buttonTextColor}
            buttonColor={COLOR_PALETTE.buttonColor}
            onPress={_handleSave}>
            Save
          </Button>
        </View>
      )}
    </ActionSheet>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    loadingContainer: {
      marginVertical: 40,
    },
    loadingText: {
      fontSize: 15,
      alignSelf: 'center',
      fontFamily: FONTS.regular,
      marginTop: 10,
      color: COLOR_PALETTE.textColor,
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
    button: {
      width: '75%',
      borderRadius: 10,
      alignSelf: 'center',

      marginTop: 20,
    },
    buttonLabel: {
      fontSize: 13,
      fontFamily: FONTS.bold,
    },
  });
};

export default NotiAddSheet;
