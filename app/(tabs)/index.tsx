import { StyleSheet, Image, Pressable, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link, useRouter } from "expo-router";
import { useState, useEffect } from 'react';
import Write from '../../assets/images/write.svg';
import type { Post } from "../../types";
import { listenPosts } from '../../services/posts';

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const unsubscribe = listenPosts(setPosts);
    return () => unsubscribe(); 
  }, []);
 
  const router = useRouter();

  function goToWrite(){
   router.push("/write"); 
  }

  return (
    <View style={styles.container}>
      <Pressable 
      style={styles.write}
      onPress={goToWrite}
      >
        <Write></Write>
      </Pressable>
      
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <Link href={{ pathname: "/[id]", params: { id: item.id } }} asChild>
          <Pressable style={styles.box}>
            <View style={{ flex: 1, flexDirection: "row", gap: 20, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>{item.userName}</Text>
              <Text style={{ color: "#888", marginBottom: 10 }}>{item.createdAt}</Text>
            </View>
            <Text>{item.content}</Text>
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: "100%", height: 300, marginTop: 10, borderRadius: 8, marginTop:40 }}
              />
            )}
          </Pressable>
        </Link>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  write: {
    backgroundColor:"#000",
    borderRadius: 50,
    padding: 10,
    width: 45,
    height: 45,
    position:"fixed",
    right:"5%",
    bottom:"10%",
    zIndex:100
  },
  box:{
    padding:20,
    borderWidth:1,
    borderRadius:20,
    borderColor: "#c9c9c972",
    elevation: 2,
    marginBottom:20,

    // Web (PC 시연)
    boxShadow: "2px 2px 4px rgba(0,0,0,0.08)", 
  },
  img: {
    width:40,
    height:40,
    backgroundColor:"#777777",  
    borderRadius:50
  },
});
