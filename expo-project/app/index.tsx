import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Appbar, Text, Card, FAB, TextInput, IconButton, Button } from "react-native-paper";
import { getUserToken, deleteUserToken } from "@/utils/storage";
import { useRouter } from "expo-router";

type Habit = {
  id: number;
  name: string;
  checked: boolean;
};

const HomeScreen = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getUserToken();
      if (!token) router.replace("/auth");
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await deleteUserToken();
    router.replace("/auth");
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { id: Date.now(), name: newHabit.trim(), checked: false }]);
      setNewHabit("");
      setShowInput(false);
    }
  };

  const toggleHabit = (id: number) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, checked: !h.checked } : h))
    );
  };

  const deleteHabit = (id: number) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Habit Tracker" />
        <Appbar.Action icon="chart-bar" onPress={() => router.push("/stats")} />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>

      {/* Empty State */}
      {habits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={styles.emptyText}>
            No habits yet. Start tracking your habits today!
          </Text>
        </View>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={[styles.card, item.checked && styles.completedCard]}>
              <Card.Title
                title={item.name}
                titleStyle={item.checked ? styles.completedText : styles.habitText}
                right={() => (
                  <View style={styles.actions}>
                    <IconButton
                      icon={item.checked ? "check-circle" : "circle-outline"}
                      onPress={() => toggleHabit(item.id)}
                    />
                    <IconButton icon="delete" onPress={() => deleteHabit(item.id)} />
                  </View>
                )}
              />
            </Card>
          )}
        />
      )}

      {showInput && (
        <TextInput
          mode="outlined"
          label="New Habit"
          value={newHabit}
          onChangeText={setNewHabit}
          onSubmitEditing={addHabit}
          style={styles.input}
        />
      )}
      <FAB
        icon={showInput ? "check" : "plus"}
        onPress={() => (showInput ? addHabit() : setShowInput(true))}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  card: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  completedCard: { backgroundColor: "#e0f7e9" },
  habitText: { fontSize: 16, color: "#000" },
  completedText: {
    fontSize: 16,
    color: "#777",
    textDecorationLine: "line-through",
  },
  actions: { flexDirection: "row", alignItems: "center" },
  input: { margin: 10, marginHorizontal: 20 },
  fab: { position: "absolute", bottom: 16, right: 16, backgroundColor: "#6200ea" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  emptyText: { textAlign: "center", color: "#aaa", fontSize: 18 },
});

export default HomeScreen;
