import { StyleSheet, View } from 'react-native'
import { Badge, HStack, Spacer, Text, ScrollView, Image } from "native-base";
import { RecipieDetailsProps } from '../../containers/withRecipeDetailsScreen'
import { Colors } from '../../utils/constants';
import { Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import React from 'react';
import IngredientTable from '../../components/IngredientTable';

const RecipeDetailsScreen = (props: RecipieDetailsProps) => {
  const {recipe} = props;

  const mappedSteps = recipe.analyzedInstructions.map((i: any) => i.steps).flat();

  const mappedIngredients = recipe.extendedIngredients.map(i => {
    const [aisle, name] = [i.aisle, i.name];
    return [aisle, name];
  })

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{uri: recipe.image}} alt={recipe.title} />
      <Text style={styles.title}>{recipe.title}</Text>
      <View style={styles.details}>
          <Badge margin={1} colorScheme="cyan" _text={{color: "white"}} variant="solid" rounded="4">
            <Text style={[styles.detailItem, styles.detailText]}>{recipe.readyInMinutes}m</Text>
          </Badge>  
          <Badge margin={1} colorScheme="cyan" _text={{color: "white"}} variant="solid" rounded="4">
            <Text style={[styles.detailItem, styles.detailText]}>{recipe.servings} servings</Text>
          </Badge>  
          <Badge margin={1} colorScheme="cyan" _text={{color: "white"}} variant="solid" rounded="4">
            <Text style={[styles.detailItem, styles.detailText]}>{recipe.vegan ? 'Vegan' : 'Not vegan'}</Text>
          </Badge>  
          <Badge margin={1} colorScheme="cyan" _text={{color: "white"}} variant="solid" rounded="4">
            <Text style={[styles.detailItem, styles.detailText]}>{recipe.vegetarian ? 'Vegetarian' : 'Not vegetarian'}</Text>
          </Badge>  
          <Badge margin={1} colorScheme="cyan" _text={{color: "white"}} variant="solid" rounded="4">
            <Text style={[styles.detailItem, styles.detailText]}>{recipe.veryHealthy ? 'Very healthy' : 'Not healthy'}</Text>
          </Badge>  
          <Badge margin={1} colorScheme="cyan" _text={{color: "white"}} variant="solid" rounded="4">
            <Text style={[styles.detailItem, styles.detailText]}>{recipe.veryPopular ? 'Very popular' : 'Not Popular'}</Text>
          </Badge>  
          <Badge margin={1} colorScheme="cyan" _text={{color: "white"}} variant="solid" rounded="4">
            <Text style={[styles.detailItem, styles.detailText]}>{recipe.cheap ? 'Cheap' : 'Not cheap'}</Text>
          </Badge>  
          <Badge margin={1} colorScheme="cyan" _text={{color: "white"}} variant="solid" rounded="4">
            <Text style={[styles.detailItem, styles.detailText]}>{recipe.glutenFree ? 'Gluten free' : 'Not gluten free'}</Text>
          </Badge>  
      </View>
      <View style={styles.outerContainer}>
        <View style={styles.listContainer}>
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Ingredients</Text>
        </View>
        <IngredientTable
          renderCheckboxes={true}
          headRow={['Aisle', 'Name']}
          headRowFlex={[1, 1]}
          rowsData={mappedIngredients}
          rowsFlex={[1, 1]}
        />
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Steps</Text>
        </View>
        {mappedSteps.map((step: any) => {
          return (
            <View style={styles.list} key={step.number} >
                <Text style={styles.itemText}>{step.number}. {step.step}</Text>
            </View>
          )
        })}
          {/* data.map(dataPoint => (
        <View style={styles.list} key={dataPoint}>
            <Text style={styles.itemText}>{dataPoint}</Text>
        </View> */}
        </View>
      </View>
    </ScrollView>
  )
}

export default RecipeDetailsScreen

const styles = StyleSheet.create({
  rootContainer: {
    paddingBottom: 32,
    backgroundColor: Colors.tertiary
  },
  image: {
    width: '100%',
    height: 300
  },
  title: {
    padding: 10,
    fontSize: 24,
    textAlign: 'center',
    color: "#fff",
  },
  detailText: {
    color: "#fff"
  },
  listContainer: {
    width: '80%'
  },
  outerContainer: {
    alignItems: 'center'
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingHorizontal: 8
  },
  detailItem: {
      marginHorizontal: 4,
      fontSize: 12
  },
  subtitleContainer: {
    padding: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#e2b497',
    marginHorizontal: 12,
    marginVertical: 4
  },
  subtitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  list: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
  },
  itemText: {
    color: '#fff',
    textAlign: 'center'
  } 
});