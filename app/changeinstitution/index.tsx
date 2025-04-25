import useInstitutionsStore from '@/store/institution.store';
import useUsersStore from '@/store/user.store';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const InstitutionScreen = () => {
    const user = useUsersStore((state) => state.user);
    const setUserInstitution = useUsersStore((state) => state.setUserInstitution);
    const getInstitutions = useInstitutionsStore((state) => state.getInstitutions);
    const institutions = useInstitutionsStore((state) => state.institutions);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstitutions = async () => {
            setLoading(true);
            await getInstitutions("A");
            setLoading(false);
        };
        fetchInstitutions();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Institución Actual:</Text>
            <Text style={styles.currentInstitution}>{user?.institutions?.name || "No seleccionada"}</Text>

            <Text style={styles.subtitle}>Seleccione una nueva institución:</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#A0AEC0" />
            ) : (
                (institutions && institutions.length > 0) ? (
                    <Picker
                        selectedValue={user?.institutions}
                        onValueChange={(itemValue) => setUserInstitution(itemValue)}
                        style={styles.picker}
                    >
                        {institutions?.map((institution, index) => (
                            <Picker.Item label={institution.name} value={institution} key={index} />
                        ))}
                    </Picker>
                ) : (
                    <Text style={styles.noInstitutionsText}>No hay instituciones disponibles.</Text>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#1E293B',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#F3F4F6',
        marginBottom: 10,
        textAlign: 'center',
    },
    currentInstitution: {
        fontSize: 18,
        fontWeight: '600',
        color: '#CBD5E1',
        marginBottom: 30,
        textAlign: 'center',
        borderBottomColor: '#64748B',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#A0AEC0',
        marginBottom: 15,
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#F3F4F6',
        backgroundColor: '#334155',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#4A5568',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 10,
    },
    noInstitutionsText: {
        fontSize: 16,
        color: '#E2E8F0',
        textAlign: 'center',
        marginTop: 10,
        fontStyle: 'italic',
    },
});

export default InstitutionScreen;
