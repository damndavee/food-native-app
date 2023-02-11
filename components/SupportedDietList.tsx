import { Center, FormControl, VStack, Radio, Stack, WarningOutlineIcon} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { Colors, CUSTOM_SEARCH, CUSTOM_SEARCH_KEYS } from '../utils/constants';

type SupportedDiedListProps = {
    selected: any[],
    isValid: boolean;
    customProperty: string,
    onSetCustomProperty: (value: string) => void,
    onSetSelected: (item: any) => void
}

const SupportedDietList = (props: SupportedDiedListProps) => {
    const renderDataItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                <Ionicons color="black" name="add-circle" size={20} />
            </View>
        );
    };

    // types from the library
    const renderSelectedDataItem = (item: any, unSelect: any): JSX.Element | null | undefined => {
        return (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <View style={styles.selectedStyle}>
                    <Text style={styles.textSelectedStyle}>{item.label}</Text>
                    <Ionicons color="black" name="remove-circle" size={17} />
                </View>
            </TouchableOpacity>
        )
    }

    const renderCustomSearchPropertiesRadioButtons = () => {
        return Object.values(CUSTOM_SEARCH_KEYS).map(key => {
            return (
                <Radio key={key} value={key} size="sm" my={1}>
                    <Text style={styles.radioText}>{key}</Text>
                </Radio>
            )
        })
    }

    return (
        <View style={styles.listContainer}>
            <VStack marginTop={5} marginX={15} alignItems="center" marginBottom={10}>
                <Radio.Group onChange={(value) => props.onSetCustomProperty(value)} name="propertyGroup" defaultValue={props.customProperty} accessibilityLabel="Chose property to search for a recipe">
                    <Stack 
                        direction='row'
                        alignItems="center"
                        space={4}
                    >
                       {renderCustomSearchPropertiesRadioButtons()}
                    </Stack>
                </Radio.Group>
            </VStack>
            <VStack paddingX={5} flex={1}>
                <Center>
                    <FormControl isRequired isInvalid={!props.isValid}>
                    <MultiSelect
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={CUSTOM_SEARCH[props.customProperty]}
                        labelField="label"
                        valueField="value"
                        placeholder={`Select ${props.customProperty}`}
                        value={props.selected}
                        search
                        searchPlaceholder="Search..."
                        onChange={item => props.onSetSelected(item)}
                        renderItem={renderDataItem}
                        renderSelectedItem={(item, unSelect) => renderSelectedDataItem(item, unSelect)}
                    />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            No value provided!
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Center>
            </VStack>
        </View>
    )
}

export default SupportedDietList;

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    dropdown: {
        height: 45,
        backgroundColor: Colors.text,
        borderRadius: 5,
        padding: 12,
        shadowColor: '#000',
        borderWidth: 1,
        borderColor: "#ccc"
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 14,
        marginRight: 10,
        paddingHorizontal: 6,
        paddingVertical: 8,
        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 12,
    },
    radioText: {
        color: Colors.text
    }
})