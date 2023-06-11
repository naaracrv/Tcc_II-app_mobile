import { View, Button, StyleSheet, Image, Text } from "react-native";
import { CustomButton } from "./../components/CustomButton";
import HelpHeader from "../assets/svg/headerSVG/helpHeader.svg";

import LogoFinalizado from "../assets/svg/logosSVG/LogoFinalizado.svg";

export function FinalizadoScreen({ navigation }) {
    function backToMenu() {
        navigation.navigate("IniciarJogo");
    }

    return (
        <View style={styles.container}>
            <LogoFinalizado style={styles.logo} />
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
        paddingTop: 40,
    },
    logo: {
        width: 240,
        height: 240,
        marginTop: 60,
        marginBottom: 70,
    },
});
