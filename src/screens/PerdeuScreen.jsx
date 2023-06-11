import { View, Button, StyleSheet, Image, Text } from "react-native";
import { CustomButton } from "./../components/CustomButton";
import HelpHeader from "../assets/svg/headerSVG/helpHeader.svg";

import LogoPerdeu from "../assets/svg/logosSVG/LogoPerdeu.svg";

export function PerdeuScreen({ navigation, route }) {
    const { levelAtual } = route.params;

    function repeatLevel() {
        navigation.navigate(levelAtual);
    }

    function backToMenu() {
        navigation.navigate("IniciarJogo");
    }
    function handleStartGame(level) {
        navigation.navigate(level);
    }

    return (
        <View style={styles.container}>
            <LogoPerdeu style={styles.logo} />
            <CustomButton
                title="     Jogar novamente"
                bgColor="rgba(0, 150, 46, 0.5)"
                borderColor="rgba(0, 150, 46, 1)"
                onPress={repeatLevel}
            />
            <View style={styles.botao}>
                <CustomButton
                    title="Voltar ao menu"
                    bgColor="rgba(255, 255, 255, 0.7)"
                    borderColor="rgba(159, 159, 159, 1)"
                    onPress={backToMenu}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(203,137,225,1)",
        alignItems: "center",
        position: "relative",
        paddingTop: 80,
    },
    logo: {
        width: 240,
        height: 240,
        marginTop: 60,
        marginBottom: 30,
    },
    botao:{
        padding: 30,
    }
});
