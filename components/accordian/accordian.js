import { useState } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Sizes } from '../../constants/sizes';
import { TypeScale } from '../../constants/type_scale';
import { Colors } from '../../constants/colors';



export default function Accordian({ unsaveRecipe, id, title, image, description, ingredients }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleAccordion = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (

        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity onPress={() => unsaveRecipe(id)}><Text>Delete</Text></TouchableOpacity>
            <View style={styles.header}>
                <Text style={{ fontSize: TypeScale.headlineSmall, ...styles.title, }}>{title}</Text>
                <TouchableOpacity onPress={toggleAccordion}>
                    {
                        isCollapsed ?
                            <AntDesign name='arrowdown' size={20} /> :
                            <AntDesign name='arrowup' size={20} />

                    }
                </TouchableOpacity>
            </View>
            {
                !isCollapsed && (
                    <View style={styles.textContainer}>
                        <Text style={{ ...TypeScale.h4Headline, color: Colors.accentColor, fontWeight: 'bold' }}>ingredients</Text>

                        <FlatList
                            data={ingredients}
                            renderItem={({ item }) => {
                                return <Text>{item}</Text>
                            }}
                        />
                        <Text style={{ ...TypeScale.h4Headline, color: Colors.accentColor, fontWeight: 'bold' }}>Directions</Text>

                        <Text style={styles.description}>{description}</Text>
                    </View>
                )
            }
        </View >

    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    card: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
        margin: 10,
    },
    image: {
        height: 200,
        width: '100%',
    },
    textContainer: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    description: {
        fontSize: 16,
        color: '#555',
    },
});