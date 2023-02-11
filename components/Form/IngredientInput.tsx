import { StyleSheet, Text, View } from 'react-native';
import { Input, FormControl, Select, CheckIcon } from "native-base";
import { Colors } from '../../utils/constants';

export type IngredientInputProps = {
    inputNumber: number;
    inputId: number;
    selectValue: string;
    onChangeIngredient: (id: string, ingredientId: number, enteredValue: string) => void;
}

const IngredientInput = (props: IngredientInputProps) => {
  return (
    <View style={styles.inputContainer}>
        <View style={styles.inputsWrapper}>
            <View style={styles.inputWrapper}>
                <FormControl style={styles.formControl}>
                    <Input style={styles.input} placeholderTextColor={Colors.primary} placeholder="Enter aisle" onChangeText={props.onChangeIngredient.bind(this, 'aisle', props.inputId)} />
                </FormControl>
                <FormControl style={styles.formControl}>
                    <Input style={styles.input} placeholderTextColor={Colors.primary} placeholder="Enter amount" onChangeText={props.onChangeIngredient.bind(this, 'amount', props.inputId)} />
                </FormControl>
            </View>
            <View style={styles.inputWrapper}>
                <FormControl style={styles.formControl}>
                    <Input style={styles.input} placeholderTextColor={Colors.primary} placeholder="Enter ingredient" onChangeText={props.onChangeIngredient.bind(this, 'name', props.inputId)} />
                </FormControl>
                <FormControl style={styles.formControl}>
                    <Select selectedValue={props.selectValue} variant="filled" accessibilityLabel="Choose Service" placeholderTextColor={Colors.primary} placeholder="Choose unit" _selectedItem={{
                        endIcon: <CheckIcon size="5" />
                    }} onValueChange={props.onChangeIngredient.bind(this, 'unit', props.inputId)}>
                        <Select.Item label="Ml" value="ml" />
                        <Select.Item label="Tbsp" value="tbsp" />
                        <Select.Item label="Servings" value="servings" />
                        <Select.Item label="G" value="g" />
                        <Select.Item label="Small" value="small" />
                        <Select.Item label="Medium" value="medium" />
                        <Select.Item label="Big" value="big" />
                        <Select.Item label="Clove" value="clove" />
                    </Select>
                </FormControl>
            </View>
        </View>
    </View>
  )
}

export default IngredientInput;

const styles = StyleSheet.create({
    inputContainer: {
        paddingBottom: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary2,
        marginBottom: 10,
    },
    inputWrapper: {
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputsWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    ingredientNumber: {
        borderWidth: 1,
        borderColor: Colors.text
    },
    textNumber: {
        fontSize: 14,
        padding: 5,
        color: Colors.text
    },
    input: {
        color: Colors.primary,
        backgroundColor: "#fff",
        border: 'none',
        borderRadius: 4,
    },
    formControl: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 5,
    }
})