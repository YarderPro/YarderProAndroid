import { Image, StyleSheet, TextInput, Pressable, Text, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { useAppContext } from '../appContext';
import { useRouter} from "expo-router";

export default function DeflectionCalcScreen() {
  const router = useRouter();
  const { setDeflectionData } = useAppContext();

  // Initialize state with values from params or default to empty
  const [sGround, onsGroundChange] = React.useState<string>('');
  const [sMid, onsMidChange] = React.useState<string>(''); 
  const [towerH, ontowerHChange] = React.useState<string>(''); 
  const [length, onLengthChange] = React.useState<string>(''); 

  const [isGroundDegrees, setGroundDegrees] = React.useState(false);
  const [isMidDegrees, setMidDegrees] = React.useState(false);
  const [isTowerMetric, setTowerMetric] = React.useState(true);
  const [isLengthMetric, setLengthMetric] = React.useState(true);

  // Result var stored as a string
  var result = '';

  // Function to calculate %deflection
  const calculateDeflection = (
    // User input variables
    sGround: number,
    sMid: number,
    towerH: number,
    length: number,
    // Unit toggle boolean variables
    isGroundDegrees: boolean,
    isMidDegrees: boolean,
    isTowerMetric: boolean,
    isLengthMetric: boolean
  ) => {
    if (sGround == null || sMid == null || towerH <= 0 || length <= 0) {
      return '';
    }

    if (isGroundDegrees) {
      sGround = Math.tan(sGround) * 100;
    }
    if (isMidDegrees) {
      sMid = Math.tan(sMid) * 100;
    }
    if (!isTowerMetric) {
      towerH *= 0.9144;
    }
    if (!isLengthMetric) {
      length *= 0.9144;
    }

    const calculatedResult = (sGround - sMid) / 2.2 + (towerH / length) / 2.2;
    return `${calculatedResult.toFixed(2)}`;
  };
  const handleDone = () => {
    result = calculateDeflection(
      +sGround,
      +sMid,
      +towerH,
      +length,
      isGroundDegrees,
      isMidDegrees,
      isTowerMetric,
      isLengthMetric
    );

    // Serialize the data and navigate back to the index
    setDeflectionData({
      sGround,
      sMid,
      towerH,
      length,
      result,
      isGroundDegrees,
      isMidDegrees,
      isTowerMetric,
      isLengthMetric
    });
    router.push('/');
  };

  // Grey out buttons when they're selected
  const getButtonStyle = (isSelected: boolean) => ({
    backgroundColor: isSelected ? "#d3d3d3" : "#fff",
    opacity: isSelected ? 0.5 : 1,
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/AppIcon.jpeg")}
          style={styles.reactLogo}
        />
      }
    >
      {/* Titles and displayed formula */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Deflection Calculator</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter values below:</ThemedText>
        <ThemedText type="default" style={styles.formula}>
          % Deflection = (Sground – Smidspan) / 2.2 + (TowerH / Length) / 2.2
        </ThemedText>

        {/* Inputs and Buttons */}

          {/* sGround */}
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
              onPress={() => setGroundDegrees(true)}
            >
              <Text>Degrees</Text>
            </Pressable>
            <Pressable
              style={[styles.button, getButtonStyle(!isGroundDegrees)]}
              onPress={() => setGroundDegrees(false)}
            >
              <Text>%Slope</Text>
            </Pressable>
          </View>

          {/* sMid */}
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
              onPress={() => setMidDegrees(true)}
            >
              <Text>Degrees</Text>
            </Pressable>
            <Pressable
              style={[styles.button, getButtonStyle(!isMidDegrees)]}
              onPress={() => setMidDegrees(false)}
            >
              <Text>%Slope</Text>
            </Pressable>
          </View>

          {/* towerH */}
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
              onPress={() => setTowerMetric(true)}
            >
              <Text>Meters</Text>
            </Pressable>
            <Pressable
              style={[styles.button, getButtonStyle(!isTowerMetric)]}
              onPress={() => setTowerMetric(false)}
            >
              <Text>Yards</Text>
            </Pressable>
          </View>

          {/* length */}
          <View style={styles.inputGrid}>
            <TextInput
              style={styles.textInput}
              onChangeText={onLengthChange}
              value={length}
              placeholder="Cable length..."
              keyboardType="numeric"
            />
            <Pressable
              style={[styles.button, getButtonStyle(isLengthMetric)]}
              onPress={() => setLengthMetric(true)}
            >
              <Text>Meters</Text>
            </Pressable>
            <Pressable
              style={[styles.button, getButtonStyle(!isLengthMetric)]}
              onPress={() => setLengthMetric(false)}
            >
              <Text>Yards</Text>
            </Pressable>
          </View>

        {/* Result Output */}
        <ThemedText type="subtitle">
          %Deflection = {calculateDeflection( +sGround, +sMid, +towerH, +length,
            isGroundDegrees, isMidDegrees, isTowerMetric, isLengthMetric
          )}
        </ThemedText>

        <Pressable style={styles.doneButton} onPress={handleDone}>
          <ThemedText>Done</ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Tab specific styling
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 45,
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
    position: "absolute",
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
    fontStyle: "italic",
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