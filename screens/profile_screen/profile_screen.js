import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase/client'
import Button from '../../components/button/button'
import { Sizes } from '../../constants/sizes'
import { Colors } from '../../constants/colors'
import { useContext } from 'react'
import { UserContext } from '../../services/context/usercontext'
export default function UserProfileScreen({ navigation }) {

    const { session, setSession } = useContext(UserContext)
    const [userData, setUserData] = useState({
        username: 'test',
        email: 'test',
        profile: "https://randomuser.me/api/portraits/men/84.jpg"
    });
    const [Loading, setLoading] = useState(false)
    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true)
            const { data } = await supabase.auth.getUser()
            if (data.user) {
                setUserData({ ...userData, email: data.user.email, username: data.user.user_metadata.username })
                setLoading(false)
            }
        }
        if (session)
            getUserInfo()
    }, [])
    const handleLogout = async () => {
        await supabase.auth.signOut()
    }
    return (
        <View style={styles.container}>
            {
                Loading ?
                    <ActivityIndicator size={Sizes.screenIndicatorSize} color={Colors.accentColor} /> :
                    session ?
                        <>
                            {/* User Avatar */}
                            <Image source={{ uri: userData.profile }} style={styles.avatar} />

                            {/* User Info */}
                            <View style={styles.userInfo}>
                                <Text style={styles.username}>{userData.username}</Text>
                                <Text style={styles.fullName}>{userData.email}</Text>
                            </View>
                            <Button text={"Logout"} onButtonPress={handleLogout} />
                        </> :
                        <View style={{ flex: 1, gap: 20 }}>
                            <Button text={"Login"} onButtonPress={() => navigation.navigate("Login")} />
                            <Button text={"sign up"} onButtonPress={() => navigation.navigate("SignUp")} />
                        </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Sizes.screenPadding

    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        alignSelf: 'center'

    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    fullName: {
        fontSize: 16,
        color: 'gray',
    },

});