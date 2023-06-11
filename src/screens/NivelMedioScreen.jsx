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
import { useStatistics } from "../hooks/useStatistics";

import HelpHeader from "../assets/svg/headerSVG/helpHeader.svg";
import GraficoHeader from "../assets/svg/headerSVG/graficoHeader.svg";

import Coracao from "../assets/svg/medioSVG/coracao.svg";
import Naipe_ouro from "../assets/svg/medioSVG/naipe_ouro.svg";
import Naipe_espadas from "../assets/svg/medioSVG/naipe_espadas.svg";
import Naipe_paus from "../assets/svg/medioSVG/naipe_paus.svg";
import Triangulo_pra_cima from "../assets/svg/medioSVG/triangulo_pra_cima.svg";
import Triangulo_pra_baixo from "../assets/svg/medioSVG/triangulo_pra_baixo.svg";

const figureComponents = {
    coracao: <Coracao />,
    paus: <Naipe_paus />,
    ouro: <Naipe_ouro />,
    espadas: <Naipe_espadas />,
    cima: <Triangulo_pra_cima />,
    baixo: <Triangulo_pra_baixo />,
};

const types = Object.keys(figureComponents);
const levelName = "Médio";

export function NivelMedioScreen({ navigation }) {
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
            const randomFigures = genRandomVector(types, 7);
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
            navigation.navigate("Ganhou", {
                levelAtual: "NivelMedio",
                proximoLevel: "NivelDificil",
            });
        }
    }, [selected]);

    useEffect(() => {
        if (erros === 5) {
            finishLevel(levelName, false);
            navigation.navigate("Perdeu", { levelAtual: "NivelMedio" });
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
                <LevelName title="nível médio" bgColor="rgba(208,213,0,0.53)" />
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
        backgroundColor: "rgba(147,150,0,0.3)",
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
        marginTop: 40,
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
        margin: 9,
        padding: 2,
        marginTop: 7,
    },
    figureSelected: {
        margin: 8,
        padding: 2,
        marginTop: 6,
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
