import useNotificationStore from '@/store/notification.store';
import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Activity } from '@/types/Activity.type';
import { convertDateToDMYString } from '@/functions/handleTime';

const NotificationModal = () => {
    const isNotificationModalVisible = useNotificationStore((state) => state.isNotificationModalVisible);
    const hideNotificationModal = useNotificationStore((state) => state.hideNotificationModal);
    const notificationData = useNotificationStore((state) => state.notificationData);


    let activity: Activity | undefined;
    try {
        const body = notificationData?.data?.body;
        if (typeof body === 'string') {
            const parsedBody = JSON.parse(body);
            activity = parsedBody.activity as Activity;
        }
    } catch (error) {
        console.error("Error al parsear el JSON del body:", error);
        activity = undefined;
    }

    if (!activity) {
        return null;
    }

    const formattedDate = activity.date ? convertDateToDMYString(new Date(activity.date)) : "Fecha no especificada";
    const formattedTime = activity.time
        ? new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : "Hora no especificada";

    return (
        <Modal visible={isNotificationModalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Recordatorio de Actividad</Text>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                    <Text style={styles.activityDate}>Fecha: {formattedDate}</Text>
                    <Text style={styles.activityTime}>Hora: {formattedTime}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={hideNotificationModal}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '85%',
        padding: 20,
        backgroundColor: '#2D3748',
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#F3F4F6',
        marginBottom: 15,
    },
    activityName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#F3F4F6',
        marginBottom: 10,
    },
    activityDescription: {
        fontSize: 16,
        color: '#D1D5DB',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 22,
    },
    activityLocation: {
        fontSize: 14,
        color: '#A0AEC0',
        marginBottom: 10,
    },
    activityDate: {
        fontSize: 16,
        color: '#D1D5DB',
        fontWeight: '500',
        marginBottom: 5,
    },
    activityTime: {
        fontSize: 16,
        color: '#D1D5DB',
        fontWeight: '500',
        marginBottom: 15,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#F97316',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 6,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default NotificationModal;
