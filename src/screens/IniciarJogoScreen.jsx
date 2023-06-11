import {
    View,
    Button,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import { CustomButton } from "./../components/CustomButton";
import GraficoHeader from "../assets/svg/headerSVG/graficoHeader.svg";
import LogoInicio from "../assets/svg/logosSVG/LogoInicio.svg";

const niveis = ["NivelFacil", "NivelMedio", "NivelDificil"];

export function IniciarJogoScreen({ navigation, route }) {
    let savedLevel = null;

    function handleStartGame(level) {
        navigation.navigate(level);
    }

    if (route.params) {
        const { levelAtual } = route.params;
        savedLevel = levelAtual;
    }

    const sortearNivel = () => {
        const indiceSorteado = Math.floor(Math.random() * niveis.length);
        const nivelSorteado = niveis[indiceSorteado];
        navigation.navigate(nivelSorteado);
    };

    function continuar() {
        if (savedLevel) {
            navigation.navigate(savedLevel);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => navigation.navigate("Estatisticas")}
            >
                <GraficoHeader />
            </TouchableOpacity>

            <LogoInicio style={styles.logo} />

            {savedLevel && (
                <CustomButton
                    title="Continuar"
                    bgColor="rgba(255,59, 59,0.5)"
                    borderColor="rgba(255,59,59,1)"
                    onPress={continuar}
                />
            )}

            <CustomButton
                title="Jogar"
                bgColor="rgba(255, 255, 255, 0.7)"
                borderColor="rgba(159, 159, 159, 1)"
                // escolher entre os menus de forma aleatoria
                onPress={sortearNivel}
            />
            <CustomButton
                title="Fácil"
                bgColor="rgba(0, 150, 46, 0.5)"
                borderColor="rgba(0, 150, 46, 1)"
                onPress={() => handleStartGame("NivelFacil")}
            />
            <CustomButton
                title="Médio"
                bgColor="rgba(208, 213, 0, 0.4)"
                borderColor="rgba(208, 213, 0, 1)"
                onPress={() => handleStartGame("NivelMedio")}
            />
            <CustomButton
                title="Difícil"
                bgColor="rgba(0, 105, 150, 0.7)"
                borderColor="rgba(0, 105, 150, 1)"
                onPress={() => handleStartGame("NivelDificil")}
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
    header: {
        position: "absolute",
        right: 25,
        top: 80,
        color: "rgba(74,74,74,1)",
    },
});
