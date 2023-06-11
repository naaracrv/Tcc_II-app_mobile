import { View, Button, StyleSheet, Image, Text } from "react-native";
import { CustomButton } from "./../components/CustomButton";
import HelpHeader from "../assets/svg/headerSVG/helpHeader.svg";

import LogoGanhou from "../assets/svg/logosSVG/LogoGanhou.svg";

export function GanhouScreen({ navigation, route }) {
    const { levelAtual, proximoLevel } = route.params;

    function goToNextLevel() {
        navigation.navigate(proximoLevel);
    }

    function repeatLevel() {
        navigation.navigate(levelAtual);
    }

    function backToMenu() {
        navigation.navigate("IniciarJogo");
    }

    return (
        <View style={styles.container}>
            <LogoGanhou style={styles.logo} />
            <CustomButton
                title="Próximo nível"
                bgColor="rgba(208, 213, 0, 0.4)"
                borderColor="rgba(208, 213, 0, 1)"
                onPress={goToNextLevel}
            />
            <CustomButton
                title="     Jogar novamente"
                bgColor="rgba(0, 150, 46, 0.5)"
                borderColor="rgba(0, 150, 46, 1)"
                onPress={repeatLevel}
            />
            <CustomButton
                title="Voltar ao menu"
                bgColor="rgba(255, 255, 255, 0.7)"
                borderColor="rgba(159, 159, 159, 1)"
                onPress={backToMenu}
            />
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
    },
});
