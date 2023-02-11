import { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, FormControl, Input, WarningOutlineIcon, Button, Checkbox } from "native-base";
import { Colors } from '../utils/constants';
import IngredientInput from '../components/Form/IngredientInput';
import InputWrapper from "../components/Form/InputWrapper";
import Checkboxes from "../components/Form/Checkboxes";
import ImagePicker from "../components/Form/ImagePicker";
import { IngredientType, StepType } from "../store/recipe/recipe.types";
import { AddCustomRecipeProps } from "../containers/withAddCustomRecipeScreen";
import StepInput from "../components/Form/StepInput";


const AddCustomRecipeScreen = (props: AddCustomRecipeProps) => {

  const { 
      ingredients, recipe, steps, onSubmitRecipe, onAddIngredientInput, 
      onSetRecipe, onSetDishType, onSetSteps, onAddStepInput, onChangeIngredient, selectedImage, setSelectedImage } = props;

  const renderIngredientsInput = () => {
    return ingredients.map((i: IngredientType, index) => <IngredientInput selectValue={i.measure.unit} key={i.id} onChangeIngredient={onChangeIngredient} inputId={i.id} inputNumber={index} />)
  }

  const renderStepInput = () => {
    return steps.map((s: StepType, index) => <StepInput inputId={s.id} onChange={onSetSteps} />);
  }

  return (
    <ScrollView style={styles.formContainer}>
      <View style={styles.form}>
          <FormControl isInvalid={false}>
            <FormControl.Label>
              <Text style={styles.inputLabel}>Dish name</Text>
            </FormControl.Label>
            <Input style={styles.input} placeholderTextColor={Colors.primary} placeholder="Enter dish name" onChangeText={onSetRecipe.bind(this, 'title')} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              No value provided!
            </FormControl.ErrorMessage>
          </FormControl>
          <InputWrapper style={styles.inputWrapper}>
            <FormControl flex={1} mr={2} isInvalid={false}>
                <FormControl.Label>
                <Text style={styles.inputLabel}>Dish type</Text>
                </FormControl.Label>
                <Input style={styles.input} placeholderTextColor={Colors.primary} placeholder="e.g dinner" onChangeText={onSetDishType} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                No value provided!
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl flex={1} mr={2} isInvalid={false}>
                <FormControl.Label>
                <Text style={styles.inputLabel}>Servings</Text>
                </FormControl.Label>
                <Input style={styles.input} keyboardType="number-pad" placeholderTextColor={Colors.primary} placeholder="servings" onChangeText={onSetRecipe.bind(this, 'servings')} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                No value provided!
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl flex={1} isInvalid={false}>
                <FormControl.Label>
                <Text style={styles.inputLabel}>Duration (minutes)</Text>
                </FormControl.Label>
                <Input style={styles.input} keyboardType="number-pad" placeholderTextColor={Colors.primary} placeholder="Duration" onChangeText={onSetRecipe.bind(this, 'readyInMinutes')} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                No value provided!
                </FormControl.ErrorMessage>
            </FormControl>
          </InputWrapper>
          <Checkboxes onChange={onSetRecipe} />
          <ImagePicker onSelectImage={setSelectedImage} pickedImage={selectedImage} />
          <View style={styles.ingredientsWrapper}>
            <View style={styles.controls}>
              <Button android_ripple={{color: '#ccc'}} onPress={onAddIngredientInput}>Add Ingredient</Button>
            </View>
            {renderIngredientsInput()}
            <View style={styles.controls}>
              <Button android_ripple={{color: '#ccc'}} onPress={onAddStepInput}>Add Step</Button>
            </View>
            {renderStepInput()}
          </View>
      <Button android_ripple={{color: '#ccc'}} onPress={onSubmitRecipe} variant="subtle">Submit New Recipe</Button>
      </View>
    </ScrollView>
  )
}
export default AddCustomRecipeScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: Colors.tertiary,
  },
  inputWrapper: {
    flex: 1,
    marginVertical: 5,
    flexDirection: 'row'
  },
  form: {
    flex: 1,
    marginTop: 5,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  ingredientsWrapper: {
    flex: 1,
  },
  input: {
    color: Colors.primary,
    backgroundColor: Colors.text,
    border: 'none',
    borderRadius: 4,
  },
  inputLabel: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 4,
    marginLeft: 5
  },
  controls: {
    flex: 1,
    padding: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },
})