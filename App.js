import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');
import { getMovies } from './api';
import { Genres, Rating, Loading } from './src/components';


const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;


export default function App() {

  const [movies, setMovies] = React.useState([]);


  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies(movies);
      // setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  if (movies.length > 0) {
    console.log("movies");
    console.log(movies);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={movies.reverse().slice(1)}
          keyExtractor={(item) => item.key}
          horizontal
          // removeClippedSubviews={false}
          renderToHardwareTextureAndroid
          contentContainerStyle={{ alignItems: "center" }}

          renderItem={({ item, index }) => {
            return (
              <View style={{ width: ITEM_SIZE }}>
                <View
                  style={{
                    marginHorizontal: SPACING,
                    paddingHorizontal: SPACING * 2,
                    alignItems: 'center',
                    backgroundColor: "white",
                    borderRadius: 34,
                  }}>


                  <Image
                    source={{ uri: item.poster }}
                    style={styles.posterImage}
                  />

                  <Text style={{ fontSize: 24 }} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Rating rating={item.rating} />
                  <Genres genres={item.genres} />
                  <Text style={{ fontSize: 12 }} numberOfLines={3}>
                    {item.description}
                  </Text>

                </View>
              </View>
            )
          }}
        >

        </FlatList>
      </View>

    </SafeAreaView>
  )
}




const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
