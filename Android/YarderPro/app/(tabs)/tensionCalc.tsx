//jacky


import { Image, StyleSheet, TextInput, Text, Pressable, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';  
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { useAppContext } from '../appContext';
import { useRouter} from "expo-router";
  
export default function tensionCalcScreen() {
  const [lSpan, lSpanChange] = React.useState<string>('');
  const [pLoad, pLoadChange] = React.useState<string>('');
  const [yMid, yMidChange] = React.useState<string>('');
  const [qWeight, qWeightChange] = React.useState<string>('');

  const [isqWeightMetric, setqWeightMetric] = React.useState(false); //kg
  const [isyMidMetric, setyMidMetric] = React.useState(false); //m
  const [islSpanMetric, setlSpanMetric] = React.useState(false); //m
  const [ispLoadMetric, setpLoadMetric] = React.useState(false); //kg

  var result = '';

  const router = useRouter();
  const { deflectionData, setTensionData } = useAppContext();

  const getButtonStyle = (isSelected: boolean) => ({
    backgroundColor: isSelected ? "#d3d3d3" : "#fff",
    opacity: isSelected ? 0.5 : 1,
  });

  // Function to calculate %deflection
  const calculateTension = (
    lSpan: number,
    pLoad: number,
    yMid: number,
    qWeight: number,
    isqWeightMetric: boolean,
    isyMidMetric: boolean,
    islSpanMetric: boolean,
    ispLoadMetric: boolean
  ) => {
    if (lSpan <= 0 || pLoad <= 0 || yMid <= 0 || qWeight <= 0) {
      return '';
    }

    const term1 = (lSpan * pLoad) / (4 * yMid);
    const term2 = (qWeight * lSpan ** 2) / (8 * yMid);

    const result = term1 + term2;
    return "Tension = " + result;
  };

  const handleDone = () => {
    result = calculateTension(
      +lSpan,
      +pLoad,
      +yMid,
      +qWeight,
      isqWeightMetric,
      isyMidMetric,
      islSpanMetric,
      ispLoadMetric
    );

    // Serialize the data and navigate back to the index
    setTensionData({
      lSpan,
      pLoad,
      yMid,
      qWeight,
      result,
      isqWeightMetric,
      isyMidMetric,
      islSpanMetric,
      ispLoadMetric
    });
    router.push('/');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/AppIcon.jpeg')}
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

        <View style={styles.inputGrid}>
          <TextInput 
              style={styles.textInput} 
              onChangeText={lSpanChange} 
              value={(lSpan )} 
              placeholder="Yarder to tailhold span..." 
              keyboardType="numeric"
          />
          <Pressable
              style={[styles.button, getButtonStyle(islSpanMetric)]}
              onPress={() => setlSpanMetric(true)}
            >
              <Text>Yds</Text>
            </Pressable>
            <Pressable
              style={[styles.button, getButtonStyle(!islSpanMetric)]}
              onPress={() => setlSpanMetric(false)}
            >
              <Text>m</Text>
            </Pressable>
          </View>

          <View style={styles.inputGrid}>

              <TextInput 
                  style={styles.textInput} 
                  onChangeText={pLoadChange} 
                  value={(pLoad )} 
                  placeholder="Total load..." 
                  keyboardType="numeric"
              />
            <Pressable
                style={[styles.button, getButtonStyle(ispLoadMetric)]}
                onPress={() => setpLoadMetric(true)}
              >
                <Text>Lbs</Text>
              </Pressable>
              <Pressable
                style={[styles.button, getButtonStyle(!ispLoadMetric)]}
                onPress={() => setpLoadMetric(false)}
              >
                <Text>Kg</Text>
              </Pressable>
          </View>

          <View style={styles.inputGrid}>
            <TextInput 
              style={styles.textInput} 
              onChangeText={yMidChange} 
              value={(yMid )} 
              placeholder="Mid-span deflection..." 
              keyboardType="numeric"
          />
          <Pressable
              style={[styles.button, getButtonStyle(isyMidMetric)]}
              onPress={() => setyMidMetric(true)}
            >
              <Text>Lbs</Text>
            </Pressable>
            <Pressable
              style={[styles.button, getButtonStyle(!isyMidMetric)]}
              onPress={() => setyMidMetric(false)}
            >
              <Text>Kg</Text>
            </Pressable>
          </View>              

          <View style={styles.inputGrid}>
            <TextInput 
              style={styles.textInput} 
              onChangeText={qWeightChange} 
              value={(qWeight )} 
              placeholder="Weight of the cable..." 
              keyboardType="numeric"
            />
            <Pressable
              style={[styles.button, getButtonStyle(isqWeightMetric)]}
              onPress={() => setqWeightMetric(true)}
            >
              <Text>Yds</Text>
            </Pressable>
            <Pressable
              style={[styles.button, getButtonStyle(!isqWeightMetric)]}
              onPress={() => setqWeightMetric(false)}
            >
              <Text>m</Text>
            </Pressable>
            
        </View>
        
        <Pressable style={styles.doneButton} onPress={handleDone}>
              <ThemedText>Done</ThemedText>
        </Pressable>

        <ThemedText type="subtitle">{calculateTension(+lSpan, +pLoad, +yMid, +qWeight, islSpanMetric, ispLoadMetric, isyMidMetric, isqWeightMetric)}
        </ThemedText>

      </ThemedView>
    </ParallaxScrollView>
  );
}

//css
const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 45,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 180,
      width: 500,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    textInput: {
      borderColor: "black",
      borderStyle: "solid",
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
      textAlign: "center",
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputGrid: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    doneButton: {
      backgroundColor: "#007AFF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
      alignItems: "center",
      alignSelf: "center",
    },
  });
