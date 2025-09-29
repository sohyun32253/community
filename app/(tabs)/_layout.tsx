import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
        fontWeight: "bold",       
        fontSize: 22,             
        color: "#222",        
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Feed" }}  />
      <Tabs.Screen name="write" options={{ title: "Write" }} />
      <Tabs.Screen name="account" options={{ title: "Account" }} />
    </Tabs>
  );
}
