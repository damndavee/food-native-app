import { StyleSheet, Text, View } from 'react-native';
import { Image, AspectRatio, VStack, Checkbox } from "native-base";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { ShoppingRecipeType } from '../store/recipe/recipe.types';
import { Colors } from '../utils/constants';
import IconButton from './IconButton';
import IngredientTable from './IngredientTable';

interface ShoppingItemProps extends ShoppingRecipeType {
    onRemove: (id: number) => void;
    onCheckIngredient: (recipeId: number, ingredientId: number) => void;
}

const ShoppingItem = (props: ShoppingItemProps) => {
    const newArray = props.ingredients.map(obj => {
        const [name, measureAmount, measureUnit] = [obj.name, obj.measure.amount, obj.measure.unit];
        return [name, measureAmount, !!measureUnit ? measureUnit : '-'];
    });

    const checkboxes = props.ingredients.map(i => <Checkbox 
                                                    style={styles.checkbox}
                                                    defaultIsChecked={i.isChecked}
                                                    value={i.name}
                                                    onChange={() => props.onCheckIngredient(props.id, i.id)}
                                                    aria-label={i.name}
                                                />);
  
    return (
        <View style={styles.itemContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>{props.title}</Text>
                <IconButton 
                    color={Colors.primary} 
                    name="remove-circle" 
                    onPress={() => props.onRemove(props.id)} />
            </View>
            <VStack>
                <AspectRatio w="100%" ratio={12 / 5}>
                    <Image source={{uri: props.image}} alt={props.title} resizeMode="cover" />
                </AspectRatio>
                <View style={styles.ingredientsContainer}>
                    <IngredientTable 
                        renderCheckboxes={true}
                        checkboxes={checkboxes} 
                        headRow={['', 'Name', 'Measure', 'Unit']}
                        headRowFlex={[1, 3, 2, 2]}
                        rowsData={newArray}
                        rowsFlex={[3, 2, 2]}
                    />
                </View>
            </VStack>
        </View>
    )
}

export default ShoppingItem;

const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 6,
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: Colors.text,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#fff",
        alignItems: 'center'
    },
    heading: {
        flex: 1,
        color: Colors.tertiary,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    ingredientsContainer: {
        marginVertical: 5,
        marginHorizontal: 4
    },
    head: { 
        height: 40,  
        backgroundColor: '#f1f8ff'  
    },
    wrapper: { 
        flexDirection: 'row' 
    },
    title: { 
        backgroundColor: '#f6f8fa', 
    },
    row: {  
        height: 28,
        backgroundColor: '#fff'
    },
    text: { 
        textAlign: 'center', 
        fontSize: 12 
    },
    checkbox: {
        marginHorizontal: 10,
    },
})