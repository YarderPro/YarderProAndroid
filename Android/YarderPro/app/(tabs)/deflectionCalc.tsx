import { Image, StyleSheet, TextInput, Pressable, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';  
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
  
export default function deflectionCalcScreen() {
    const [sGround, onsGroundChange] = React.useState('');
    const [sMid, onsMidChange] = React.useState('');
    const [towerH, ontowerHChange] = React.useState('');
    const [length, onlengthChange] = React.useState('');

    var isGroundDegrees = false;
    var isMidDegrees = false;
    var isTowerMetric = false;
    var isLenghtMetic = false;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Deflection Calculator</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter values below: </ThemedText>
        <ThemedText type="default" style={styles.formula}>
            % Deflection = (Sground – Smidspan) / 2.2 + (TowerH / Length) / 2.2
        </ThemedText>

        {/*Text input and buttons */}
        <View style={styles.inputGrid}>
          {/*Input for % slope to ground*/}
          <TextInput 
              style={styles.textInput} 
              onChangeText={onsGroundChange} 
              value={(sGround )} 
              placeholder="% slope to ground..." 
              keyboardType="numeric"
          />
          <Pressable 
              style={styles.button}
              onPress={() => 
                isGroundDegrees = true
              }>
              <Text>Button</Text>
          </Pressable>
        </View>

        <View style={styles.inputGrid}>
          {/*Input for % slope to midspan*/}
          <TextInput 
              style={styles.textInput} 
              onChangeText={onsMidChange} 
              value={(sMid )} 
              placeholder="% slope to midspan..." 
              keyboardType="numeric"
          />
          <Pressable 
              style={styles.button}
              onPress={() => alert('You pressed a button.')}>
              <Text>Button</Text>
          </Pressable>
        </View>

        <View style={styles.inputGrid}>
          {/*Input for towere height*/}
          <TextInput 
              style={styles.textInput} 
              onChangeText={ontowerHChange} 
              value={(towerH )} 
              placeholder="Tower height..." 
              keyboardType="numeric"
          />
          <Pressable 
              style={styles.button}
              onPress={() => alert('You pressed a button.')}>
              <Text>Button</Text>
          </Pressable>
        </View>

        <View style={styles.inputGrid}>
          {/*Input for cable length*/}
          <TextInput 
              style={styles.textInput} 
              onChangeText={onlengthChange} 
              value={(length )} 
              placeholder="Cable length..." 
              keyboardType="numeric"
          />
          <Pressable 
              style={styles.button}
              onPress={() => alert('You pressed a button.')}>
              <Text>Button</Text>
          </Pressable>
        </View>

        {/*Result output*/}
        <ThemedText type="subtitle">{calculateDeflection(+sGround, +sMid, +towerH, +length, 
                                                        isGroundDegrees, isMidDegrees, isTowerMetric, isLenghtMetic)}
        </ThemedText>

      </ThemedView>
    </ParallaxScrollView>
  );
}

// function to calculate %deflection (will handle unit conversions)
function calculateDeflection(sGround: number, sMid: number, towerH: number, length: number, 
                            isGroundDegrees: boolean, isMidDegrees: boolean, isTowerMetric: boolean, isLenghtMetic: boolean) {
    // Check for invalid inputs
    if (sGround == null || sMid == null || towerH <= 0 || length <= 0) {
      return;
    }

    // Convert units as needed
    if (isGroundDegrees) {

    }
    if (isMidDegrees) {

    }
    if (isTowerMetric) {

    }
    if (isLenghtMetic) {

    }

    // Calculate / output results
    var result = ( (sGround - sMid) / 2.2) + ( (towerH / length) / 2.2 );

    return "%Deflection = " + result;
}

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
    width: 150,
    padding: 3,
  },
  formula: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  button: {
    height: 30,
    width: 55,
    padding: 3,
    marginLeft: 5,
    textAlign: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  inputGrid: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
});
