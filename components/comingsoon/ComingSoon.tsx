import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ComingSoonScreen = () => {
    const router = useRouter();
    const gotoBack = async () => {
        try {
            router.navigate("/(tabs)");
        } catch (error) {
            console.error('Error al hacer logout:', error);
        }
    };
    return (
        <View style={styles.container}>
            <Ionicons name="construct-outline" size={80} color="#F97316" style={styles.icon} />
            <Text style={styles.title}>Funcionalidad No Disponible</Text>
            <Text style={styles.description}>
                Esta funcionalidad aún no está disponible, pero estamos trabajando para implementarla pronto.
            </Text>
            <TouchableOpacity style={styles.button} onPress={gotoBack}>
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F2937',
        padding: 20,
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#F3F4F6',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#D1D5DB',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#F97316',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default ComingSoonScreen;
