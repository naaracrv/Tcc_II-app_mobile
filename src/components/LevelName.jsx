import { StyleSheet, View, Text } from "react-native";

export function LevelName(props) {
    return (
        <View>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: props.bgColor,
                    },
                ]}
                {...props}
            >
                <Text style={styles.text}>{props.title.toUpperCase()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 130,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderColor: "rgba(151,151,151,1)",
    },
    text: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
});
