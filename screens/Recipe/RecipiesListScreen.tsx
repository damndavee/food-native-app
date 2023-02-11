import { StyleSheet, Text, View } from 'react-native';
import { FlatList, HStack, Spinner, Heading } from 'native-base';

import { RecipiesListProps } from '../../containers/withRecipiesListScreen';
import Recipe from '../../components/Recipe';
import LoaderComponent from '../../components/Loader';

import { Colors } from '../../utils/constants';


const RecipiesListScreen = (props: RecipiesListProps) => {

  const {isLoading, recipies} = props;

  return (
    <View style={styles.rootContainer}>
      {isLoading ? 
        <LoaderComponent /> : 
      (
        <View style={styles.recipeContainer}>
          {recipies.length === 0 ? <Text>No recipies found!</Text> : (
            <FlatList numColumns={2} data={recipies} keyExtractor={(item) => item.id.toString()} renderItem={(itemData) => <Recipe key={itemData.item.id} recipe={itemData.item} />} />
          )}
        </View>
      )}
    </View>
  )
}

export default RecipiesListScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.tertiary,
  },
  recipeContainer: {
    flex: 1,
    padding: 10,
  }
})