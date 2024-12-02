import { Image, StyleSheet, Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useAppContext } from '../appContext';
import React from "react";

export default function HomeScreen() {
  const router = useRouter();
  const { deflectionData } = useAppContext();
  const [calculations, setCalculations] = React.useState<
    { date: string; inputs: Record<string, any> }[]
  >([]);

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

      <ThemedView>
            <ThemedText>Deflection Data:</ThemedText>
            <ThemedText>Slope to Ground: {deflectionData.sGround}</ThemedText>
            <ThemedText>Slope to Midspan: {deflectionData.sMid}</ThemedText>
            <ThemedText>Tower Height: {deflectionData.towerH}</ThemedText>
            <ThemedText>Length: {deflectionData.length}</ThemedText>
            <ThemedText>%Deflection: {deflectionData.result}</ThemedText>
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
