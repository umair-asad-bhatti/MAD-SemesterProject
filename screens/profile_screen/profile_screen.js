import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { supabase } from '../../services/supabase/client';
import Button from '../../components/button/button';
import { Sizes } from '../../constants/sizes';
import { Colors } from '../../constants/colors';
import { UserContext } from '../../services/context/usercontext';

export default function UserProfileScreen({ navigation }) {
    const { session } = useContext(UserContext);
    const [userData, setUserData] = useState({
        username: 'test',
        email: 'test',
        profile: 'https://randomuser.me/api/portraits/men/7.jpg',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                setUserData({ ...userData, email: data.user.email, username: data.user.user_metadata.username });
                setLoading(false);
            }
        };
        if (session) getUserInfo();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size={Sizes.screenIndicatorSize} color={Colors.accentColor} />
            ) : session ? (
                <View style={styles.userInfoContainer}>
                    {/* User Avatar */}
                    <Image source={{ uri: userData.profile }} style={styles.avatar} />

                    {/* User Info */}
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{userData.username}</Text>
                        <Text style={styles.email}>{userData.email}</Text>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonsContainer}>
                        <Button text={'Logout'} onButtonPress={handleLogout} />
                        <Button text={'Saved Recipes'} onButtonPress={() => navigation.navigate('SavedRecipes')} />
                    </View>
                </View>
            ) : (
                <View style={styles.buttonsContainer}>
                    <Button text={'Saved Recipes'} onButtonPress={() => navigation.navigate('SavedRecipes')} />
                    <Button text={'Login'} onButtonPress={() => navigation.navigate('Login')} />
                    <Button text={'Sign Up'} onButtonPress={() => navigation.navigate('SignUp')} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Sizes.screenPadding,
        justifyContent: 'center',
    },
    userInfoContainer: {
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: 'gray',
    },
    buttonsContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
});
