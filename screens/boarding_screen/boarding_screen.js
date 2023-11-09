
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring, withDelay } from 'react-native-reanimated'
export default function BoardingScreen({ navigation }) {
    const outerRingPadding = useSharedValue(0)
    const innerRingPadding = useSharedValue(0)
    const buttonOpacity = useSharedValue(0)
    useEffect(() => {
        innerRingPadding.value = withDelay(600, withSpring(innerRingPadding.value + 40))
        outerRingPadding.value = withDelay(800, withSpring(outerRingPadding.value + 40))
        buttonOpacity.value = withDelay(1600, withSpring(buttonOpacity.value + 1))
    }, [])
    return (
        <View style={styles.container}>
            <Animated.View style={{ padding: outerRingPadding, backgroundColor: 'rgba(128, 0, 128,0.1)', borderRadius: 200 }}>
                <Animated.View style={{ padding: innerRingPadding, backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 200 }}>
                    <Image style={{ width: 100, height: 100, borderRadius: 100 }} source={require("../../assets/download.jpg")} />
                </Animated.View>
            </Animated.View>
            <Animated.View style={{ position: 'absolute', bottom: 160, opacity: buttonOpacity, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: "rgba(128, 0, 128,0.7)", width: 200, borderRadius: 40 }}>
                <TouchableOpacity onPress={() => navigation.replace("TabNavigationServices")}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Continue</Text>
                </TouchableOpacity>
            </Animated.View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
