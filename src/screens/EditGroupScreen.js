/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {
  Divider,
  TextInput,
  Avatar,
  Button,
  IconButton,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import {COLOR_PALETTE, FONTS} from '../utils/Constants';
import services from '../services/service';
import JobAddWorkerItem from '../components/manager/JobAddWorkerItem';
import {useToast} from 'react-native-toast-notifications';
import {ProviderContext} from '../provider/Provider';

const EditGroupScreen = ({navigation, route}) => {
  const provider = useContext(ProviderContext);

  const toast = useToast();
  const [imgURL, setImgURL] = useState(route.params.imgURL);
  const [employees, setEmployees] = useState(route.params.users);
  const [name, setName] = useState(route.params.name);

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = async () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      setIsLoading(true);
      if (name === route.params.name) {
        setIsEdit(false);
        setIsLoading(false);
        return;
      }
      const {data} = await services.updateGroup(
        route.params.id,
        name,
        undefined,
        undefined,
      );
      console.log(data);
      toast.show(data.message, {type: data.success ? 'success' : 'danger'});
      route.params.update(name);
      setIsLoading(false);
      setIsEdit(false);
    }
  };

  const addUser = async () => {
    const {added, removed} = await SheetManager.show('NotiAddSheet', {
      payload: employees.map(emp => emp.id),
    });
    console.log('employees: ', employees);
    console.log(added, removed);
    const {data} = await services.updateGroup(
      route.params.id,
      undefined,
      added,
      removed,
    );

    console.log(data);
    if (data.success === true) {
      setEmployees(data?.employees);
    }
  };
  const changeImage = async () => {
    try {
      setIsLoading(true);
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
        loadingLabelText: 'Loading, Please Wait!',
      });

      const {data} = await services.setGroupImage(route.params.id, {
        image: `data:${result.mime};base64,${result.data}`,
      });
      if (data.success) {
        setImgURL(data.url);
        toast.show('Picture is changed successfully', {type: 'success'});
      }
    } catch (error) {
      toast.show('There was error while changing Group Picture', {
        type: 'danger',
      });
      // console.error('Error changing profile', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <IconButton
          icon="arrow-left"
          iconColor="#04092199"
          disabled={isLoading}
          size={18}
          onPress={() => navigation.goBack()}
        />
        <Button onPress={toggleEdit} disabled={isLoading}>
          {isEdit ? 'Done' : 'Edit'}
        </Button>
        {/* <Button onPress={handleCreate}>+</Button> */}
      </View>
      <View>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <TouchableOpacity onPress={changeImage} disabled={isLoading}>
            <Avatar.Image
              size={150}
              source={
                imgURL
                  ? {uri: provider.s3URL + imgURL}
                  : require('../assets/job_icon.png')
              }></Avatar.Image>
          </TouchableOpacity>
          {isEdit ? (
            <TextInput
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 20,
                backgroundColor: 'white',
                width: '60%',
              }}
              value={name}
              onChangeText={text => {
                setName(text);
              }}
            />
          ) : (
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
              {name}
            </Text>
          )}
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center',
            paddingTop: 20,
          }}>
          <View
            style={{
              width: '80%',
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              height: '75%',
            }}>
            <TouchableOpacity
              disabled={isLoading}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
                padding: 10,
                borderRadius: 50,
                backgroundColor: '#F1F1F1',
              }}
              onPress={addUser}>
              <Text>Add People</Text>
            </TouchableOpacity>
            <Divider style={{margin: 10, backgroundColor: 'black'}} />
            <FlatList
              data={employees}
              renderItem={({item, index}) => (
                <JobAddWorkerItem item={item} onPress={() => {}} />
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default EditGroupScreen;
