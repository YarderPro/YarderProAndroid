import { Image, StyleSheet, Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [calculations, setCalculations] = React.useState<
    { date: string; inputs: Record<string, any> }[]
  >([]);

  React.useEffect(() => {
    if (params.inputs) {
      try {
        const parsedInputs =
          typeof params.inputs === "string"
            ? JSON.parse(params.inputs)
            : params.inputs;
        if (typeof parsedInputs === "object" && parsedInputs !== null) {
          setCalculations((prev) => [
            ...prev,
            { date: new Date().toLocaleDateString(), inputs: parsedInputs },
          ]);
        }
      } catch (error) {
        console.error("Failed to parse inputs:", error);
      }
    }
  }, [params]);

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
      <ThemedView style={styles.calculationList}>
        {calculations.map((calc, index) => (
          <Pressable
            key={index}
            style={styles.calculationBox}
            onPress={() => router.push({ pathname: "/deflectionCalc", params: calc.inputs })}
          >
            <ThemedText>Calculation</ThemedText>
            <ThemedText>{calc.date}</ThemedText>
          </Pressable>
        ))}
      </ThemedView>
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
  },
});
