import { FlatList } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingItem from '../components/ShoppingItem';
import { ShoppingListProps } from '../containers/withShoppingListScreen';
import { Colors } from '../utils/constants';

const ShoppingListScreen = (props: ShoppingListProps) => {
  const { shoppingList, onRemove, onCheckIngredient } = props;

  return (
    <View style={styles.rootContainer}>
      <View style={styles.outerContainer}>
        <View>
          {shoppingList.length > 0 ? (
            <FlatList 
                data={shoppingList} 
                keyExtractor={(item) => item.id.toString()} 
                renderItem={(itemData) => <ShoppingItem onCheckIngredient={onCheckIngredient} onRemove={onRemove} {...itemData.item} />} 
              />
          ) : (
            <View style={styles.innerContainer}>
              <Text>No shopping list items yet!</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default ShoppingListScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.tertiary,
    flex: 1,
  },
  outerContainer: {
    margin: 10
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})