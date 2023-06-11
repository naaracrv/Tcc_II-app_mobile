import {
    View,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { LevelName } from "./../components/LevelName";
import { genRandomVector } from "./../utils/aleatorio";
import { AjudaModal } from "./../components/AjudaModal";
import HelpHeader from "../assets/svg/headerSVG/helpHeader.svg";
import GraficoHeader from "../assets/svg/headerSVG/graficoHeader.svg";
import { useStatistics } from "../hooks/useStatistics";

import Asterisco from "../assets/svg/dificilSVG/asterisco.svg";
import Bolinha from "../assets/svg/dificilSVG/bolinha.svg";
import Certo from "../assets/svg/dificilSVG/certo.svg";
import Infinito from "../assets/svg/dificilSVG/infinito.svg";
import Losangulo from "../assets/svg/dificilSVG/losangulo.svg";
import Mais from "../assets/svg/dificilSVG/mais.svg";
import Seta_baixo from "../assets/svg/dificilSVG/seta_baixo.svg";
import Seta_cima from "../assets/svg/dificilSVG/seta_cima.svg";
import Seta_direita from "../assets/svg/dificilSVG/seta_direita.svg";
import Seta_esquerda from "../assets/svg/dificilSVG/seta_esquerda.svg";
import Sol from "../assets/svg/dificilSVG/sol.svg";
import X from "../assets/svg/dificilSVG/x.svg";

const figureComponents = {
    "*": <Asterisco />,
    bolinha: <Bolinha />,
    certo: <Certo />,
    infinito: <Infinito />,
    losangulo: <Losangulo />,
    "+": <Mais />,
    baixo: <Seta_baixo />,
    cima: <Seta_cima />,
    direita: <Seta_direita />,
    esquerda: <Seta_esquerda />,
    sol: <Sol />,
    x: <X />,
};

const types = Object.keys(figureComponents);
const levelName = "Difícil";

export function NivelDificilScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState([]);
    const [figuraCerta, setFiguraCerta] = useState("");
    const [ganhou, setGanhou] = useState(false);
    const [erros, setErros] = useState(0);
    const [figures, setFigures] = useState([]);
    const { startLevel, finishLevel, registerClick } = useStatistics();

    const isFocused = useIsFocused();

    const qtFigCertas = figures.filter(
        (figure) => figure.name === figuraCerta
    ).length;

    useEffect(() => {
        if (isFocused) {
            const index = Math.floor(Math.random() * types.length);
            const figure = types[index];
            setFiguraCerta(figure);
            setModalVisible(false);
            setSelected([]);
            setGanhou(false);
            setErros(0);
            const randomFigures = genRandomVector(types, 6);
            setFigures(randomFigures);

            // statistics
            startLevel(levelName);
        }
    }, [isFocused]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    title="Help"
                    onPress={() => setModalVisible(true)}
                >
                    <HelpHeader />
                </TouchableOpacity>
                // <TouchableOpacity
                //     title="Grafic"
                //     onPress={}
                // >
                //     <GraficoHeader />
                // </TouchableOpacity>\
            ),
            headerRightContainerStyle: {
                marginRight: 10,
            },
        });
    }, [navigation]);

    useEffect(() => {
        if (qtFigCertas > 0 && selected.length === qtFigCertas) {
            setGanhou(true);
            finishLevel(levelName, true);
            navigation.navigate("Finalizado");
        }
    }, [selected]);

    useEffect(() => {
        if (erros === 5) {
            finishLevel(levelName, false);
            navigation.navigate("Perdeu", { levelAtual: "NivelDificil" });
        }
    }, [erros]);

    // captura em qual imagem esta send clicado
    function clickFigure(figure) {
        if (figure.name === figuraCerta) {
            if (!selected.includes(figure.id)) {
                setSelected([...selected, figure.id]);
                registerClick(levelName, true);
            }
        } else {
            setErros(erros + 1);
            registerClick(levelName, false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.level}>
                <LevelName
                    title="nível difícil"
                    bgColor="rgba(0,105,150,0.3)"
                />
            </View>
            <View style={styles.enunciado}>
                <Text style={styles.text}>
                    Identifique as figuras iguais a esta:
                </Text>
                <View style={styles.enunciadoFigure}>
                    {figureComponents[figuraCerta]}
                </View>
            </View>
            <View style={styles.meio}>
                {figures.map((figure, index) => {
                    return (
                        <TouchableOpacity
                            style={
                                selected.includes(figure.id)
                                    ? styles.figureSelected
                                    : styles.figures
                            }
                            onPress={() => clickFigure(figure)}
                            key={figure.id}
                        >
                            {figureComponents[figure.name]}
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Text style={styles.chances}>{`${erros}/5`}</Text>
            <AjudaModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 33,
        backgroundColor: "rgba(0,123,150,0.3)",
    },
    level: {
        padding: 20,
        paddingBottom: 30,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    enunciado: {
        width: 331,
        height: 67,
    },
    text: {
        fontSize: 24,
        lineHeight: 35,
        textAlign: "center",
        fontFamily: "Montserrat_400Regular",
    },
    enunciadoFigure: {
        marginTop: 42,
        marginLeft: 210,
        position: "absolute",
    },
    meio: {
        width: 330,
        height: 330,
        padding: 6,
        marginTop: 40,
        borderWidth: 1,
        borderRadius: 25,
        flexWrap: "wrap",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "rgba(152,150,150,1)",
        backgroundColor: "rgba(217,217,217,0.1)",
    },
    figures: {
        // mudar aqui
        margin: 3,
        padding: 2.5,
        marginTop: 7.5,
        // marginLeft: 8,
    },
    figureSelected: {
        // um a menos q a anterior
        margin: 2,
        padding: 2.5,
        marginTop: 6.5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "red",
    },
    chances: {
        marginTop: 60,
        textAlign: "center",
        fontSize: 20,
        fontFamily: "RibeyeMarrow_400Regular",
    },
});
