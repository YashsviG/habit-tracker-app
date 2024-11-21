import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Habit = {
    id: number;
    name: string;
    checked: boolean;
};

type Props = {
    habit: Habit;
    setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
};

const HabitCard: React.FC<Props> = ({ habit, setHabits }) => {
    const toggleHabit = () => {
        setHabits((prev) =>
            prev.map((h) =>
                h.id === habit.id ? { ...h, checked: !h.checked } : h
            )
        );
    };

    const deleteHabit = () => {
        setHabits((prev) => prev.filter((h) => h.id !== habit.id));
    };

    return (
        <View style={styles.card}>
            <Text style={styles.text}>{habit.name}</Text>
            <Button title={habit.checked ? 'Uncheck' : 'Check'} onPress={toggleHabit} />
            <Button title="Delete" onPress={deleteHabit} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    text: { flex: 1 },
});

export default HabitCard;
