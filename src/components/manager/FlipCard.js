import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import GestureFlipView from 'react-native-gesture-flip-card';
import Progress, {Circle} from 'react-native-progress';

import SwitchSvg from '../../assets/icons/Switch';
import {ProviderContext} from '../../provider/Provider';

const FlipCard = () => {
  let viewRef = useRef();
  const [progress, setProgress] = useState(0);
  const provider = useContext(ProviderContext);

  useEffect(() => {
    provider._countProjectUsers();
    setProgress(
      provider.workerCount && provider.employeeCount
        ? provider.workerCount / provider.employeeCount
        : 0,
    );
  }, [provider.workerCount, provider.employeeCount, provider]);

  const renderFront = props => {
    return (
      <View style={[styles.progressContainer, {backgroundColor: '#5F33E1E5'}]}>
        <View style={{flex: 1}}>
          <Text
            allowFontScaling={false}
            style={{fontSize: 14, color: '#fff', marginVertical: 5}}>
            {provider.selectedDate}
          </Text>
          <Text allowFontScaling={false} style={{fontSize: 20, color: '#fff'}}>
            Employees with job
          </Text>
        </View>
        <Circle
          size={90}
          progress={progress}
          allowFontScaling={false}
          showsText={true}
          borderWidth={7}
          strokeCap="round"
          borderColor="#BDB9FF"
          thickness={5}
          style={{marginHorizontal: 10}}
        />
        <TouchableOpacity
          style={{alignSelf: 'flex-start'}}
          onPress={() => props.current.flipLeft()}>
          <SwitchSvg />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBack = props => {
    return (
      <View style={[styles.progressContainer, {backgroundColor: '#D83E3EE5'}]}>
        <View style={{flex: 1}}>
          <Text
            allowFontScaling={false}
            style={{fontSize: 14, color: '#fff', marginVertical: 5}}>
            {provider.selectedDate}
          </Text>
          <Text allowFontScaling={false} style={{fontSize: 20, color: '#fff'}}>
            Employees without job
          </Text>
        </View>
        <Circle
          size={90}
          progress={1 - progress}
          allowFontScaling={false}
          showsText={true}
          borderWidth={7}
          strokeCap="round"
          borderColor="#BDB9FF"
          thickness={5}
          style={{marginHorizontal: 10}}
        />
        <TouchableOpacity
          style={{alignSelf: 'flex-start'}}
          onPress={() => props.current.flipRight()}>
          <SwitchSvg />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{alignSelf: 'center', alignItems: 'center', marginVertical: 10}}>
      <GestureFlipView
        ref={ref => (viewRef.current = ref)}
        gestureEnabled={false}
        height={100}
        width={300}>
        {renderFront(viewRef)}
        {renderBack(viewRef)}
      </GestureFlipView>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    height: 120,
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
  },
});

export default FlipCard;
