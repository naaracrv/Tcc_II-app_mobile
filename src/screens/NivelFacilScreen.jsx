import {
    View,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { LevelName } from "./../components/LevelName";
import { useState, useEffect } from "react";
import { genRandomVector } from "./../utils/aleatorio";
import { AjudaModal } from "./../components/AjudaModal";
import { useIsFocused } from "@react-navigation/native";
import { useStatistics } from "../hooks/useStatistics";

import HelpHeader from "../assets/svg/headerSVG/helpHeader.svg";
import GraficoHeader from "../assets/svg/headerSVG/graficoHeader.svg";

import Pow from "../assets/svg/facilSVG/pow.svg";
import Nuvem from "../assets/svg/facilSVG/nuvem.svg";
import Estrela4 from "../assets/svg/facilSVG/estrela4.svg";
import Estrela5 from "../assets/svg/facilSVG/estrela5.svg";
import Estrela6 from "../assets/svg/facilSVG/estrela6.svg";

const figureComponents = {
    pow: <Pow />,
    nuvem: <Nuvem />,
    estrela4: <Estrela4 />,
    estrela5: <Estrela5 />,
    estrela6: <Estrela6 />,
};

const types = Object.keys(figureComponents);
const levelName = "Fácil";

export function NivelFacilScreen({ navigation }) {
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
            const randomFigures = genRandomVector(types, 5);
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
                levelAtual: "NivelFacil",
                proximoLevel: "NivelMedio",
            });
        }
    }, [selected]);

    useEffect(() => {
        if (erros === 5) {
            finishLevel(levelName, false);
            navigation.navigate("Perdeu", { levelAtual: "NivelFacil" });
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
                <LevelName title="nível fácil" bgColor="rgba(0,150,136,0.3)" />
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
        backgroundColor: "rgba(0,150,46,0.3)",
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
        marginTop: 35,
        marginLeft: 210,
        position: "absolute",
    },
    meio: {
        width: 330,
        height: 330,
        padding: 7,
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
        margin: 8,
        padding: 3,
        marginTop: 9,
    },
    figureSelected: {
        // um a menos q a anterior
        margin: 7,
        padding: 3,
        marginTop2: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "red",
    },
    chances: {
        marginTop: 60,
        textAlign: "center",
        fontSize: 20,
        fontFamily: "RibeyeMarrow_400Regular",
    },
});
