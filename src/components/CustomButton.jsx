import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export function CustomButton(props) {
    return (
        <View
            style={{ backgroundColor: "#fff", borderRadius: 50, marginTop: 35 }}
        >
            <TouchableOpacity
                style={[
                    styles.container,
                    {
                        backgroundColor: props.bgColor,
                        borderColor: props.borderColor,
                    },
                ]}
                {...props}
            >
                <Text style={styles.text}>{props.title.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: 240,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 50,
        paddingLeft: 16,
        paddingRight: 16,
        elevation: 12,
        borderWidth: 2,
        borderColor: "rgba(0,105,150,1)",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: "rgba(0,0,4,4)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    text: {
        lineHeight: 21,
        paddingTop: 3,
        color: "rgba(0,0,0,1)",
        fontSize: 18,
        fontFamily: "RibeyeMarrow_400Regular",
    },
});
