import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from "native-base";
import { Colors } from '../../utils/constants';
import InputWrapper from './InputWrapper';

export type CheckboxesProps = {
  onChange: (id: string, enteredValue: string | number | boolean) => void;
}

const Checkboxes = (props: CheckboxesProps) => {
    return (
        <InputWrapper style={styles.checkboxWrapper}>
            <View style={[styles.wrapper, styles.wrapperLeft]}>
              <Checkbox value="cheap" onChange={props.onChange.bind(this, 'cheap')} >
                <Text style={styles.text}>
                  Cheap dish
                </Text>
              </Checkbox>
              <Checkbox value="veryHealthy" onChange={props.onChange.bind(this, 'veryHealthy')} >
                <Text style={styles.text}>
                  Healthy dish
                </Text>
              </Checkbox>
              <Checkbox value="glutenFree" onChange={props.onChange.bind(this, 'glutenFree')}>
                <Text style={styles.text}>
                  Gluten free
                </Text>
              </Checkbox>
            </View>
            <View style={styles.wrapper}>
              <Checkbox value="vegan" onChange={props.onChange.bind(this, 'vegan')}>
                <Text style={styles.text}>
                  Vegan
                </Text>
              </Checkbox>
              <Checkbox value="vegetarian" onChange={props.onChange.bind(this, 'vegetarian')}>
                <Text style={styles.text}>
                  Vegetarian
                </Text>
              </Checkbox>
              <Checkbox value="veryPopular" onChange={props.onChange.bind(this, 'veryPopular')}>
                <Text style={styles.text}>
                  Popular dish
                </Text>
              </Checkbox>
            </View>
        </InputWrapper>
    )
};

export default Checkboxes;

export const styles = StyleSheet.create({
  checkboxWrapper: {
      justifyContent: 'space-between',
      marginVertical: 5,
      flexDirection: 'row',
      borderBottomColor: Colors.text,
      borderBottomWidth: 2,
  },
  text: {
      color: Colors.text,
      fontSize: 15,
      margin: 10
  },
  wrapper: {
      flex: 1,
      paddingBottom: 10,
  },
  wrapperLeft: {
      marginRight: 2
  },
})