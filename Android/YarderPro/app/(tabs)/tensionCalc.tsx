//jacky


import { Image, StyleSheet, TextInput, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';  
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
  
export default function tensionCalcScreen() {
  const [lSpan, lSpanChange] = React.useState('');
  const [pLoad, pLoadChange] = React.useState('');
  const [yMid, yMidChange] = React.useState('');
  const [qWeight, qWeightChange] = React.useState('');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />

        //style container - all css
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tension Calculator</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter value below: </ThemedText>
        <ThemedText type="default" style={styles.formula}>
          % Tention = ( (lSpan * pLoad) / (4 * yMid) ) + ( (qWeight * lSpan^2) / (8 * yMid) )
        </ThemedText>
        <TextInput 
            style={styles.textInput} 
            onChangeText={lSpanChange} 
            value={(lSpan )} 
            placeholder="Yarder to tailhold span..." 
            keyboardType="numeric"
        />
         <TextInput 
            style={styles.textInput} 
            onChangeText={pLoadChange} 
            value={(pLoad )} 
            placeholder="Total load..." 
            keyboardType="numeric"
        />
           <TextInput 
            style={styles.textInput} 
            onChangeText={yMidChange} 
            value={(yMid )} 
            placeholder="Mid-span deflection..." 
            keyboardType="numeric"
        />
             <TextInput 
            style={styles.textInput} 
            onChangeText={qWeightChange} 
            value={(qWeight )} 
            placeholder="Weight of the cable..." 
            keyboardType="numeric"
        />
        
        <ThemedText type="subtitle">{calculateTension(+lSpan, +pLoad, +yMid, +qWeight)}</ThemedText>

      </ThemedView>
    </ParallaxScrollView>
  );
}



//function to calculate %tension 
function calculateTension(lSpan: number, pLoad: number, yMid: number, qWeight: number) {
    if (lSpan <= 0 || pLoad <= 0 || yMid <= 0 || qWeight <= 0) {
      return;
    }

    const term1 = (lSpan * pLoad) / (4 * yMid);
    const term2 = (qWeight * lSpan ** 2) / (8 * yMid);

    const result = term1 + term2;
    return "Tension = " + result;
}



//css
const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    textInput: {
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 1,
      height: 30,
      width: 220,
      padding: 3,
    },
    formula: {
      fontSize: 10,
      fontStyle: 'italic',
    },
  });
