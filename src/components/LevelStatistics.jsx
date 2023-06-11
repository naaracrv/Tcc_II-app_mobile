import { View, StyleSheet, Text } from "react-native";

export function LevelStatistics({ statistics }) {
    const levelName = statistics.levelName;
    const validRounds = statistics.rounds.filter((item) => item.finishDate);
    const roundsNumber = validRounds.length;

    const winRounds = validRounds.filter((item) => item.win).length;
    const loseRounds = roundsNumber - winRounds;

    const winPercentage = (winRounds / roundsNumber) * 100;
    const losePercentage = 100 - winPercentage;

    const totalTimeToFirstClick = validRounds.reduce((accumulator, item) => {
        const time =
            (new Date(item.clicks[0].date) - new Date(item.startDate)) / 1000;
        return accumulator + time;
    }, 0);

    const timeToFirstClickAverage = totalTimeToFirstClick / roundsNumber;

    let totalTime = 0;
    let totalClicks = 0;
    let correctClicks = 0;

    validRounds.forEach((round) => {
        round.clicks.forEach((click, index) => {
            if (click.correct) {
                correctClicks++;
            }

            if (index > 0) {
                const currentTime = new Date(click.date);
                const previousTime = new Date(round.clicks[index - 1].date);
                const diference = (currentTime - previousTime) / 1000;
                totalTime += diference;
            }

            totalClicks++;
        });
    });

    const timeBetweenFiguresClicksAverage = totalTime / totalClicks;
    const wrongClicks = totalClicks - correctClicks;

    const correctPercentage = (correctClicks / totalClicks) * 100;
    const wrongPercentage = 100 - correctPercentage;

    let containerStyle;

    switch (levelName) {
        case "Fácil":
            containerStyle = styles.containerFacil;
            break;
        case "Médio":
            containerStyle = styles.containerMedio;
            break;
        case "Difícil":
            containerStyle = styles.containerDificil;
            break;
    }

    return (
        <View style={containerStyle}>
            
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Nível </Text>
                <Text style={styles.infoText}>{levelName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Partidas de jogadas: </Text>
                <Text style={styles.infoText}>{roundsNumber}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Partidas vencidas: </Text>
                <Text style={styles.infoText}>
                    {winRounds} ({winPercentage.toFixed(1)}%)
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Partidas perdidas: </Text>
                <Text style={styles.infoText}>
                    {loseRounds} ({losePercentage.toFixed(1)}%)
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>
                    Tempo médio para o primeiro clique:{" "}
                </Text>
                <Text style={styles.infoText}>
                    {timeToFirstClickAverage.toFixed(1)} s
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>
                    Tempo médio entre os cliques nas figuras:{" "}
                </Text>
                <Text style={styles.infoText}>
                    {timeBetweenFiguresClicksAverage.toFixed(1)} s
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Total de cliques: </Text>
                <Text style={styles.infoText}>{totalClicks}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Cliques corretos: </Text>
                <Text style={styles.infoText}>
                    {correctClicks} ({correctPercentage.toFixed(1)}%)
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Cliques errados: </Text>
                <Text style={styles.infoText}>
                    {wrongClicks} ({wrongPercentage.toFixed(1)}%)
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerFacil: {
        alignItems: "flex-start",
        backgroundColor: "rgba(0,150,46,0.5)",
        borderColor: "rgba(152,150,150,1)",
        borderWidth: 1,
        borderRadius: 25,
        padding: 15,
        marginVertical: 10,
    },
    containerMedio: {
        alignItems: "flex-start",
        backgroundColor: "rgba(208,213,0,0.53)",
        borderColor: "rgba(152,150,150,1)",
        borderWidth: 1,
        borderRadius: 25,
        padding: 15,
        marginVertical: 10,
    },
    containerDificil: {
        alignItems: "flex-start",
        backgroundColor: "rgba(0,123,150,0.5)",
        borderColor: "rgba(152,150,150,1)",
        borderWidth: 1,
        borderRadius: 25,
        padding: 15,
        marginVertical: 10,
    },
    infoContainer: {
        marginTop: 3,
        flexDirection: "row",
        alignItems: "center",
    },
    infoTitle: {
        fontSize: 13,
        fontFamily: "Montserrat_500Medium",
    },
    infoText: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
});
