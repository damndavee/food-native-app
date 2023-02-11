import { VStack, Heading, Input, Icon} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/constants";

export type SearchBarProps = {
    onSearch: (query: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
    return (
        <VStack w="80%" space={5} my={5} alignSelf="center">
          <Input 
            placeholder="Search dish name"
            color={Colors.primary}
            placeholderTextColor={Colors.primary}
            width="100%" 
            borderRadius="4" 
            py="3" 
            px="1"
            variant="filled"
            fontSize="14"
            onChangeText={props.onSearch}
            InputLeftElement={<Icon m="2" ml="3" size="6" color={Colors.primary} as={<Ionicons name="search" />} />} 
        />
        </VStack>
    )
};

export default SearchBar;