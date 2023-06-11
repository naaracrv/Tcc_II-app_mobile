import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

import { genRandomVector } from "./../utils/aleatorio";
import HelpHeader from "../assets/svg/headerSVG/helpHeader.svg";

import Pow from "../assets/svg/facilSVG/pow.svg";
import Nuvem from "../assets/svg/facilSVG/nuvem.svg";
import Estrela4 from "../assets/svg/facilSVG/estrela4.svg";
import Estrela5 from "../assets/svg/facilSVG/estrela5.svg";
import Estrela6 from "../assets/svg/facilSVG/estrela6.svg";

const figureComponents = {
    pow: <Pow width="30" height="30" />,
    nuvem: <Nuvem width="30" height="30" />,
    estrela4: <Estrela4 width="30" height="30" />,
    estrela5: <Estrela5 width="30" height="30" />,
    estrela6: <Estrela6 width="30" height="30" />,
};

const types = Object.keys(figureComponents);
const figures = genRandomVector(types, 5);

export function AjudaModal({ modalVisible, setModalVisible }) {
    const figuraCerta = "pow";

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <HelpHeader width="30" height="30" />

                    <Pow width="90" height="90" />

                    <View style={styles.meio}>
                        {figures.map((figure, index) => {
                            return (
                                <View
                                    style={
                                        figure.name === figuraCerta
                                            ? styles.figureSelected
                                            : styles.figures
                                    }
                                    onPress={() => clickFigure(figure)}
                                    key={figure.id}
                                >
                                    {figureComponents[figure.name]}
                                </View>
                            );
                        })}
                    </View>

                    <Pressable
                        style={styles.button}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.buttonText}>OK</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 120,
        marginLeft: 20,
        borderRadius: 20,
        marginRight: 20,
        marginBottom: 140,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
    },
    meio: {
        width: 270,
        height: 270,
        padding: 5,
        marginTop: 10,
        borderWidth: 1,
        flexWrap: "wrap",
        borderRadius: 25,
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "rgba(152,150,150,1)",
        backgroundColor: "rgba(217,217,217,0.1)",
    },
    figures: {
        margin: 8.5,
        padding: 2,
        marginTop: 8.5,
    },
    figureSelected: {
        margin: 7.5,
        padding: 2,
        marginTop2: 7.5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "red",
    },
    button: {
        width: 80,
        height: 40,
        marginTop: 35,
        marginBottom: 15,
        borderWidth: 2,
        marginLeft: 229,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "rgba(153,153,153,0.5)",
        backgroundColor: "rgba(153,153,153,0.2)",
    },
    buttonText: {
        fontFamily: "RibeyeMarrow_400Regular",
    },
});
