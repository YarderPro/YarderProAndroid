import { Image, StyleSheet, Pressable, FlatList, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useAppContext } from "../appContext";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const router = useRouter();
  const { deflectionData } = useAppContext();
  const [calculations, setCalculations] = React.useState<
    { id: string; result: string; inputs: Record<string, any> }[]
  >([]);

  // Load calculations from AsyncStorage
  React.useEffect(() => {
    const loadCalculations = async () => {
      const storedCalculations = await AsyncStorage.getItem("calculations");
      if (storedCalculations) {
        setCalculations(JSON.parse(storedCalculations));
      }
    };
    loadCalculations();
  }, []);

  // Save calculations to AsyncStorage
  const saveCalculations = async (newCalculations: typeof calculations) => {
    await AsyncStorage.setItem("calculations", JSON.stringify(newCalculations));
    setCalculations(newCalculations);
  };

  // Add the latest deflection data
  React.useEffect(() => {
    if (deflectionData.result) {
      const newCalculation = {
        id: `${Date.now()}`,
        result: deflectionData.result,
        inputs: { ...deflectionData },
      };
      const updatedCalculations = [...calculations, newCalculation];
      saveCalculations(updatedCalculations);
    }
  }, [deflectionData]);

  // Delete a calculation
  const deleteCalculation = (id: string) => {
    const updatedCalculations = calculations.filter((calc) => calc.id !== id);
    saveCalculations(updatedCalculations);
  };

  // Navigate to the calculator with pre-filled inputs
  const editCalculation = (inputs: Record<string, any>) => {
    router.push({
      pathname: "/deflectionCalc",
      params: { ...inputs },
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calculations</ThemedText>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/deflectionCalc")}
        >
          <ThemedText>+</ThemedText>
        </Pressable>
      </ThemedView>

      <FlatList
        data={calculations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.calculationList}
        renderItem={({ item }) => (
          <View style={styles.calculationBox}>
            <Pressable onPress={() => editCalculation(item.inputs)}>
              <ThemedText>%Deflection = {item.result}</ThemedText>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteCalculation(item.id)}
            >
              <ThemedText>Delete</ThemedText>
            </Pressable>
          </View>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  calculationList: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  calculationBox: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
