import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { RibeyeMarrow_400Regular } from "@expo-google-fonts/ribeye-marrow";

import { Routes } from "./src/routes";
import { StatisticsProvider } from "./src/hooks/useStatistics";

export default function App() {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        RibeyeMarrow_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <StatisticsProvider>
            <Routes />
        </StatisticsProvider>
    );
}
