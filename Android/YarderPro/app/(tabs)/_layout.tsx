import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Entypo from '@expo/vector-icons/Entypo';   // Custom Icon
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="deflectionCalc"
        options={{
          title: 'Deflection',
          tabBarIcon: ({}) => (
            <Entypo name="calculator" size={26} color="black" />
          ),
        }}
      />
          
      <Tabs.Screen
        name="tensionCalc"
        options={{
          title: 'Tension',
          tabBarIcon: ({}) => (
            <Entypo name="calculator" size={26} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="template"
        options={{
          title: 'Template',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          href:null,


        }}
      />
    </Tabs>
  );
}
