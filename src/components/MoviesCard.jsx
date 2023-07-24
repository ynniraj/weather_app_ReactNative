import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

const MoviesCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePress = (id) => {
    router.push(`/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php?a=indian")
      .then((res) => {
        setMovies(res.data.meals);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(true);
        console.log(e);
      });
  }, []);

  const Item = ({ title, image, id }) => (
    <TouchableOpacity onPress={() => handlePress(id)}>
      <View style={styles.item}>
        <Image
          source={{ uri: image }}
          style={{ width: 160, height: 200 }}
          resizeMode="cover"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 600 }}>
          Top Meals
        </Text>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <Item
                title={item.strMeal}
                image={item.strMealThumb}
                id={item.idMeal}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MoviesCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  item: {
    marginRight: 10,
  },
  loading: {
    marginTop: 20,
  },
});
