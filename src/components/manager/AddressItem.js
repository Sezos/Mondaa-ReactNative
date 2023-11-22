import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';

const AddressItem = ({data, index, onPress}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity key={index.toString()} onPress={onPress}>
      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.label}>
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderBottomWidth: 0.5,
      borderColor: COLOR_PALETTE.dividerColor,
      backgroundColor: '#fff',
    },
    label: {
      flex: 1,
      fontFamily: FONTS.regular,
      fontSize: 15,
      color: COLOR_PALETTE.textColor,
    },
  });
};

export default AddressItem;
