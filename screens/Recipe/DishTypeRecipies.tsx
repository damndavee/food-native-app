import { FlatList } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from "../../store/store";
import { recipiesSelector } from '../../store/recipe/recipe.selector';

import { Colors } from '../../utils/constants';
import Recipe from '../../components/Recipe';
import { RecipeType } from '../../store/recipe/recipe.types';

type DishTypeRecipiesProps = {
    type: string;
    recipies: {[props: string]: RecipeType[]}
}

const DishTypeRecipies = ({type, recipies}: DishTypeRecipiesProps) => {

  const renderRecipe = (itemData: any) => {
    if(type === "other" && !itemData.item.dishTypes.length) {
      return <Recipe recipe={itemData.item} />
    } 
    
    return itemData.item.dishTypes?.includes(type) && <Recipe recipe={itemData.item} />
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.dishHeading}>Dish type: {type}</Text>
      <View style={styles.recipesContainer}>
      <FlatList horizontal showsHorizontalScrollIndicator={false} data={recipies[type]} 
      keyExtractor={(item) => item.id.toString()} renderItem={renderRecipe} />
      </View>
    </View>
  )
}

export default DishTypeRecipies;

const styles = StyleSheet.create({
    rootContainer: {
        height: 220,
        marginVertical: 10,
        elevation: 2,
        padding: 10
    },
    dishHeading: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: Colors.text,
        color: Colors.text
    },
    recipesContainer: {
        flex: 1
    },
})