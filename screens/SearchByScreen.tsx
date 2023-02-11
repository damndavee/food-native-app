import { StyleSheet, Text, View } from 'react-native';
import { Switch, ScrollView, Button, Box, FormControl, WarningOutlineIcon, Input } from "native-base";

import SupportedDietList from "../components/SupportedDietList";
import { SearchByProps } from "../containers/withSearchByScreen";

import { Colors, HELPER_TEXTS } from '../utils/constants';

const SearchByScreen = (props: SearchByProps) => {
  const {customProperty, isValid, isCustom, selectedProperties, onSetProperty, onSelectProperty, onSubmit, onChange} = props;

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.helperTextContainer}>
          <Text style={styles.helperText}>{isCustom ? HELPER_TEXTS.customSearch : HELPER_TEXTS.baseSearch}</Text>
      </View>
      {!isCustom ? (
        <View style={styles.inputContainer}>
          <FormControl isInvalid={!isValid} w="75%" maxW="300px">
            <FormControl.Label>
              <Text style={styles.inputLabel}>Dish</Text>
            </FormControl.Label>
            <Input style={styles.input} placeholderTextColor={Colors.text} placeholder="Enter dish" onChangeText={onChange} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              No value provided!
            </FormControl.ErrorMessage>
          </FormControl>
        </View>
      ) : (
        <SupportedDietList 
          customProperty={customProperty} 
          selected={selectedProperties} 
          onSetSelected={onSelectProperty} 
          onSetCustomProperty={onSetProperty} 
          isValid={isValid}
        />
      )}
      <Button android_ripple={{color: '#ccc'}} style={styles.searchButton} onPress={onSubmit} >Search</Button>
    </ScrollView>
  )
}

export default SearchByScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.tertiary,
    paddingTop: 10
  },
  switchContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary
  },
  helperTextContainer: {
    alignItems: 'center',
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    alignItems: 'center'
  },
  heading: {
    color: Colors.text,
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  switchText: {
    fontWeight: 'bold',
    marginLeft: 10
  },
  searchButton: {
    margin: 20,
    backgroundColor: Colors.primary,
    color: Colors.text
  },
  buttonPressed: {
    opacity: 0.5,
  },
  helperText: {
    fontSize: 12,
    width: '80%',
    textAlign: 'justify',
    color: Colors.text
  },
  input: {
    color: Colors.text,
  },
  inputLabel: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 4,
    marginLeft: 5
  }
})