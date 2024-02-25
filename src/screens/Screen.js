import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

function Screen({ views }) {
  const showBlock = (param) => {
    if (param.type === "Text") {
      return <Text style={{ ...param.style }}>{param.content}lol</Text>;
    }

    if (param.type === "Image") {
      return (
        <Image
          src={param.content}
          alt={param.description}
          style={{ ...param.style }}
        ></Image>
      );
    }

    if (param.type === "Button") {
      return (
        <Button style={{ ...param.style }} onPress={param.onPress}>
          {param.content}
        </Button>
      );
    }

    if (param.type === "Block") {
      return (
        <View style={{ ...param.style }}>
          {param.children?.map((ins, idx) => {
            return <View key={idx}>{showBlock(ins)}</View>;
          })}
        </View>
      );
    }

    return (
      <Text>
        There was supposed to be {param.type} which couldn't have been rendered.
        Please contact Developer :|
      </Text>
    );
  };

  return (
    <View>
      {views?.map((block, index) => {
        return (
          <View key={index}>
            {showBlock(block)}
            {block.other || <View></View>}
          </View>
        );
      })}
    </View>
  );
}

export default Screen;
