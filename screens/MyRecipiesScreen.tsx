import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, FlatList } from "native-base";
import DishTypeRecipies from './Recipe/DishTypeRecipies';
import { MyRecipiesProps } from '../containers/withMyRecipiesScreen';
import LoaderComponent from '../components/Loader';
import {Colors} from "../utils/constants";
import SearchBar from '../components/SearchBar';

const MyRecipiesScreen = (props: MyRecipiesProps) => {
  const {isLoading, typesOfDish, typeRelatedDishes, onSearch} = props;

  const listToRender = typesOfDish.length > 0 ? (
    <FlatList 
    data={typesOfDish} 
    keyExtractor={(item) => item} 
    renderItem={(itemData) => <DishTypeRecipies type={itemData.item} recipies={typeRelatedDishes} />} />
  ) : (
    <View style={styles.innerContainer}>
      <Text>No Recipies yet!</Text>
    </View>
  )

  return (
    <View style={styles.rootContainer}>
      <SearchBar onSearch={onSearch} />
      {isLoading ? (
        <LoaderComponent />
        ) : (
          listToRender
        )}
    </View>
  )
}

export default MyRecipiesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.tertiary,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})