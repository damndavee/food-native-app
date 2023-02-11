import { StyleSheet, Text, View } from 'react-native';
import { Box, TextArea } from "native-base";
import { Colors } from '../../utils/constants';

export type StepProps = {
    onChange: (id: number, enteredValue: string) => void;
    inputId: number,
}

const StepInput = (props: StepProps) => {
    return (
      <View style={styles.stepContainer}>
        <TextArea
            style={styles.step}
            autoCompleteType={true}
            h={20} 
            placeholder="Enter step"
            placeholderTextColor={Colors.primary}
            onChangeText={props.onChange.bind(this, props.inputId)}
            w="100%"
        />
      </View>
    ) 
}

export default StepInput;

const styles = StyleSheet.create({
    stepContainer: {
        paddingBottom: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary2,
        marginBottom: 10,
    },
    step: {
        flex: 1,
        color: Colors.primary,
        backgroundColor: "#fff",
        border: 'none',
        borderRadius: 4,
    }
})