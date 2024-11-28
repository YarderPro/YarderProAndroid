import { Image, StyleSheet, TextInput, Pressable, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';  
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { isModuleNamespaceObject } from 'util/types';
  
export default function deflectionCalcScreen() {
    const [sGround, onsGroundChange] = React.useState('');
    const [sMid, onsMidChange] = React.useState('');
    const [towerH, ontowerHChange] = React.useState('');
    const [length, onlengthChange] = React.useState('');

    const [isGroundDegrees, setGroundDegrees] = React.useState(false);
    const [isMidDegrees, setMidDegrees] = React.useState(false);
    const [isTowerMetric, setTowerMetric] = React.useState(false);
    const [isLengthMetric, setLengthMetric] = React.useState(false);

    const getButtonStyle = (isSelected: boolean) => ({
      backgroundColor: isSelected ? '#d3d3d3' : '#fff',
      opacity: isSelected ? 0.5 : 1,
  });
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
            <ThemedText type="subtitle">Enter values below:</ThemedText>
            <ThemedText type="default" style={styles.formula}>
                % Deflection = (Sground – Smidspan) / 2.2 + (TowerH / Length) / 2.2
            </ThemedText>

            {/* Inputs and Buttons */}
            <View style={styles.inputGrid}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onsGroundChange}
                    value={sGround}
                    placeholder="% slope to ground..."
                    keyboardType="numeric"
                />
                <Pressable
                    style={[styles.button, getButtonStyle(isGroundDegrees)]}
                    onPress={() => {
                        // alert('Set Ground to Degrees');
                        setGroundDegrees(true);
                    }}>
                    <Text>Degrees</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, getButtonStyle(!isGroundDegrees)]}
                    onPress={() => {
                        // alert('Set Ground to %Slope');
                        setGroundDegrees(false);
                    }}>
                    <Text>%Slope</Text>
                </Pressable>
            </View>

            <View style={styles.inputGrid}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onsMidChange}
                    value={sMid}
                    placeholder="% slope to midspan..."
                    keyboardType="numeric"
                />
                <Pressable
                    style={[styles.button, getButtonStyle(isMidDegrees)]}
                    onPress={() => {
                        // alert('Set Midspan to Degrees');
                        setMidDegrees(true);
                    }}>
                    <Text>Degrees</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, getButtonStyle(!isMidDegrees)]}
                    onPress={() => {
                        // alert('Set Midspan to %Slope');
                        setMidDegrees(false);
                    }}>
                    <Text>%Slope</Text>
                </Pressable>
            </View>

            <View style={styles.inputGrid}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={ontowerHChange}
                    value={towerH}
                    placeholder="Tower height..."
                    keyboardType="numeric"
                />
                <Pressable
                    style={[styles.button, getButtonStyle(isTowerMetric)]}
                    onPress={() => {
                        // alert('Set Tower to Meters');
                        setTowerMetric(true);
                    }}>
                    <Text>Meters</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, getButtonStyle(!isTowerMetric)]}
                    onPress={() => {
                        // alert('Set Tower to Yards');
                        setTowerMetric(false);
                    }}>
                    <Text>Yards</Text>
                </Pressable>
            </View>

            <View style={styles.inputGrid}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onlengthChange}
                    value={length}
                    placeholder="Cable length..."
                    keyboardType="numeric"
                />
                <Pressable
                    style={[styles.button, getButtonStyle(isLengthMetric)]}
                    onPress={() => {
                        // alert('Set Length to Meters');
                        setLengthMetric(true);
                    }}>
                    <Text>Meters</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, getButtonStyle(!isLengthMetric)]}
                    onPress={() => {
                        // alert('Set Length to Yards');
                        setLengthMetric(false);
                    }}>
                    <Text>Yards</Text>
                </Pressable>
            </View>

            {/* Result Output */}
            <ThemedText type="subtitle">
                {calculateDeflection(+sGround, +sMid, +towerH, +length, 
                    isGroundDegrees, isMidDegrees, isTowerMetric, isLengthMetric)}
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
      sGround = Math.tan(sGround) * 100
    }
    if (isMidDegrees) {
      sMid = Math.tan(sMid) * 100
    }
    if (isTowerMetric) {
      towerH = towerH * 3.28084
    }
    if (isLenghtMetic) {
      length = length * 3.28084
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
      width: 200,
      padding: 3,
  },
  formula: {
      fontSize: 10,
      fontStyle: 'italic',
  },
  button: {
      height: 30,
      width: 65,
      padding: 3,
      marginLeft: 5,
      textAlign: 'center',
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  inputGrid: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },
});