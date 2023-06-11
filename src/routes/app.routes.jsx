import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import VoltarHeader from "../assets/svg/headerSVG/voltarHeader.svg";
import GraficoHeader from "../assets/svg/headerSVG/graficoHeader.svg";

import { IniciarJogoScreen } from "../screens/IniciarJogoScreen";
import { NivelFacilScreen } from "./../screens/NivelFacilScreen";
import { NivelMedioScreen } from "./../screens/NivelMedioScreen";
import { NivelDificilScreen } from "./../screens/NivelDificilScreen";
import { GanhouScreen } from "./../screens/GanhouScreen";
import { FinalizadoScreen } from "./../screens/FinalizadoScreen";
import { PerdeuScreen } from "./../screens/PerdeuScreen";
import { EstatisticasScreen } from "./../screens/EstatisticasScreen";

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator initialRouteName="IniciarJogo">
            <Screen
                name="IniciarJogo"
                component={IniciarJogoScreen}
                options={{
                    title: "Home",
                    headerShown: false,
                }}
            />

            <Screen
                name="Estatisticas"
                component={EstatisticasScreen}
                options={{
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: "RibeyeMarrow_400Regular",
                            }}
                        >
                            ESTATÍSTICAS
                        </Text>
                    ),
                }}
            />

            <Screen
                name="NivelFacil"
                component={NivelFacilScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        height: 100,
                    },
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "RibeyeMarrow_400Regular",
                            }}
                        >
                            JOGO DA ATENÇÃO E {"\n"}CONCENTRAÇÃO
                        </Text>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            title="voltar"
                            onPress={() =>
                                navigation.navigate("IniciarJogo", {
                                    levelAtual: "NivelFacil",
                                })
                            }
                        >
                            <VoltarHeader style={styles.voltarHeader} />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Screen
                name="NivelMedio"
                component={NivelMedioScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        height: 100,
                    },
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "RibeyeMarrow_400Regular",
                            }}
                        >
                            JOGO DA ATENÇÃO E {"\n"}CONCENTRAÇÃO
                        </Text>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            title="voltar"
                            onPress={() =>
                                navigation.navigate("IniciarJogo", {
                                    levelAtual: "NivelMedio",
                                })
                            }
                        >
                            <VoltarHeader style={styles.voltarHeader} />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Screen
                name="NivelDificil"
                component={NivelDificilScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        height: 100,
                    },
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "RibeyeMarrow_400Regular",
                            }}
                        >
                            JOGO DA ATENÇÃO E {"\n"}CONCENTRAÇÃO
                        </Text>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            title="voltar"
                            onPress={() =>
                                navigation.navigate("IniciarJogo", {
                                    levelAtual: "NivelDificil",
                                })
                            }
                        >
                            <VoltarHeader style={styles.voltarHeader} />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Screen
                name="Ganhou"
                component={GanhouScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        height: 100,
                    },
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "RibeyeMarrow_400Regular",
                            }}
                        >
                            JOGO DA ATENÇÃO E {"\n"}CONCENTRAÇÃO
                        </Text>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            title="voltar"
                            onPress={() => navigation.navigate("IniciarJogo")}
                        >
                            <VoltarHeader style={styles.voltarHeader} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            title="Grafic"
                            onPress={() => navigation.navigate("Estatisticas")}
                        >
                            <GraficoHeader />
                        </TouchableOpacity>
                    ),
                    headerRightContainerStyle: {
                        marginRight: 30,
                    },
                })}
            />

            <Screen
                name="Finalizado"
                component={FinalizadoScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        height: 100,
                    },
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "RibeyeMarrow_400Regular",
                            }}
                        >
                            JOGO DA ATENÇÃO E {"\n"}CONCENTRAÇÃO
                        </Text>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            title="voltar"
                            onPress={() => navigation.navigate("IniciarJogo")}
                        >
                            <VoltarHeader style={styles.voltarHeader} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            title="Grafic"
                            onPress={() => navigation.navigate("Estatisticas")}
                        >
                            <GraficoHeader />
                        </TouchableOpacity>
                    ),
                    headerRightContainerStyle: {
                        marginRight: 30,
                    },
                })}
            />

            <Screen
                name="Perdeu"
                component={PerdeuScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        height: 100,
                    },
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "RibeyeMarrow_400Regular",
                            }}
                        >
                            JOGO DA ATENÇÃO E {"\n"}CONCENTRAÇÃO
                        </Text>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            title="voltar"
                            onPress={() => navigation.navigate("IniciarJogo")}
                        >
                            <VoltarHeader style={styles.voltarHeader} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            title="Grafic"
                            onPress={() => navigation.navigate("Estatisticas")}
                        >
                            <GraficoHeader />
                        </TouchableOpacity>
                    ),
                    headerRightContainerStyle: {
                        marginRight: 30,
                    },
                })}
            />
        </Navigator>
    );
}

const styles = StyleSheet.create({
    voltarHeader: {
        margin: 8,
        marginLeft: 15,
        marginRight: 45,
    },
});
