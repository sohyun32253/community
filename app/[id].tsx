import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, Pressable, View, StyleSheet, Image } from "react-native";
import { getPostById, addComment } from "../services/posts";
import type { Post } from "../types";
import { useNavigation } from "expo-router";

export default function PostDetail() {
  
   const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true); 
  const [comment, setComment] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "" }); 
  }, [navigation]);

  const fetchPost = async () => {
    if (!id) return;
    setLoading(true);
    const data = await getPostById(id);
    setPost(data);
    setLoading(false); 
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return <Text>로딩중...</Text>;
  }

  if (!post) {
    return <Text>존재하지 않는 글입니다.</Text>;
  }

  const refreshComments = async () => {
    const data = await getPostById(id as string);
    if (data) {
      setPost((prev) => prev ? { ...prev, comments: data.comments } : data);
    }
  };

const handleAddComment = async () => {
  if (!comment.trim() || !post) return;

  await addComment(post.id, "나", comment);

  setComment("");
  refreshComments();
};

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor:"#fff" }}>
      <View style={{ flex: 1, flexDirection: "row", gap: 20}}>
        <Text style={{ fontWeight: "bold" }}>{post.userName}</Text>
        <Text style={{ color: "#888" }}>{post.createdAt}</Text>
      </View>
      <Text style={{ marginVertical: 8, marginBottom:40, marginTop: 30 }}>{post.content}</Text>

      {/* 첨부 이미지 */}
      {post.imageUrl && (
      <Image
        source={{ uri: post.imageUrl }}
        style={{
          width: "100%",
          height: 300,
          borderRadius: 8,
          marginBottom: 16,
        }}
        resizeMode="cover"
      />
      )}

      <FlatList
        data={post.comments}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <Text style={styles.commentBox}>
            {item.userName}: {item.text}
          </Text>
        )}
      />

      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="댓글 입력"
        style={{ borderWidth: 1, marginTop: 12, marginBottom: 8, padding: 8 }}
      />

      <Pressable
        onPress={handleAddComment}
        style={{ backgroundColor: "black", padding: 10 }}
      >
        
        <Text style={{ color: "white", textAlign: "center" }}>댓글 등록</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  postBox: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  user: { fontWeight: "bold", fontSize: 18 },
  time: { color: "#888", marginBottom: 8 },
  content: { fontSize: 16 },

  commentBox: {  
    display:"flex",
    flexDirection: "row",
    justifyContent:"space-between",
    padding:10,
    borderRadius:10,
    borderWidth:1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginBottom:20,

    // Web (PC 시연)
    boxShadow: "2px 2px 4px rgba(0,0,0,0.06)", 
    borderColor: "#ffffff", 
    
},
  commentUser: { fontWeight: "bold", marginBottom: 4 },
  img: {
    width:40,
    height:40,
    backgroundColor:"#777777",  
    borderRadius:50
  },
  footer: {
    position: "absolute",
    left: 0, right: 0, bottom: 0,
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 12,
    marginRight: 8,
  },
  submitBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
