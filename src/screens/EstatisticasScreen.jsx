import { View, StyleSheet, Text } from "react-native";
import { useStatistics } from "../hooks/useStatistics";

import { LevelStatistics } from "../components/LevelStatistics";

// const statistics = [
//     {
//         levelName: "Médio",
//         rounds: [
//             {
//                 startDate: "2023-06-10T23:44:54.070Z",
//                 clicks: [],
//                 finished: true,
//             },
//             {
//                 startDate: "2023-06-10T23:45:52.183Z",
//                 clicks: [
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:54.476Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:54.757Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:55.221Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:56.324Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:56.750Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:57.132Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:46:09.803Z",
//                     },
//                 ],
//                 finished: true,
//                 finishDate: "2023-06-10T23:46:09.901Z",
//                 totalTime: "17.7",
//             },
//         ],
//     },
//     {
//         levelName: "Difícil",
//         rounds: [
//             {
//                 startDate: "2023-06-10T23:44:56.312Z",
//                 clicks: [
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:44:59.113Z",
//                     },
//                     {
//                         correct: false,
//                         date: "2023-06-10T23:45:07.678Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:12.856Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:16.915Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:21.814Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:24.127Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:25.454Z",
//                     },
//                 ],
//                 finished: true,
//                 finishDate: "2023-06-10T23:45:25.701Z",
//                 totalTime: "29.4",
//             },
//             {
//                 startDate: "2023-06-10T23:45:35.013Z",
//                 clicks: [
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:37.237Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:38.152Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:39.647Z",
//                     },
//                     {
//                         correct: false,
//                         date: "2023-06-10T23:45:40.227Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:40.975Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:42.685Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:43.016Z",
//                     },
//                 ],
//                 finished: true,
//                 finishDate: "2023-06-10T23:45:43.252Z",
//                 totalTime: "8.2",
//             },
//             {
//                 startDate: "2023-06-10T23:46:31.303Z",
//                 clicks: [
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:46:35.073Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:46:36.106Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:46:40.146Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:46:47.110Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:47:01.456Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:47:15.078Z",
//                     },
//                 ],
//                 finished: false,
//             },
//         ],
//     },
//     {
//         levelName: "Fácil",
//         rounds: [
//             {
//                 startDate: "2023-06-10T23:45:47.011Z",
//                 clicks: [
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:48.582Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:48.795Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:49.095Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:49.395Z",
//                     },
//                     {
//                         correct: true,
//                         date: "2023-06-10T23:45:49.908Z",
//                     },
//                 ],
//                 finished: true,
//                 finishDate: "2023-06-10T23:45:49.976Z",
//                 totalTime: "3.0",
//             },
//         ],
//     },
// ];

export function EstatisticasScreen() {
    const { statistics } = useStatistics();

    return (
        <View style={styles.container}>
            {statistics.length > 0 ? (
                statistics.map((levelStatistics, index) => (
                    <LevelStatistics key={index} statistics={levelStatistics} />
                ))
            ) : (
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>
                        Não há partidas registradas. {"\n"}Jogue primeiro
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingVertical: -5,
    },
    infoContainer: {
        flex: 1,
        justifyContent: "center",
    },
    info: {
        fontSize: 24,
        fontFamily: "Montserrat_400Regular",
        textAlign: "center",
        marginTop: -100,
    },
});
