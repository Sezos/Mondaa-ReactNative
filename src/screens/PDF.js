// import React, {useContext, useRef, useState} from 'react';
// import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
// import {ProviderContext} from '../provider/Provider';

// import {PDFDocument} from 'pdf-lib';

// const PDF = async ({navigation, route}) => {
//   const provider = useContext(ProviderContext);
//   const pdfDoc = await PDFDocument.create();

//   const page = pdfDoc.addPage([550, 750]);

//   const form = pdfDoc.getForm();

//   page.drawText('Enter your favorite superhero:', {x: 50, y: 700, size: 20});
//   const pdfBytes = await pdfDoc.save();
//   return <View>a</View>;
// };

// export default PDF;
