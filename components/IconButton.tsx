import { StyleSheet} from "react-native";
import { Pressable, Box } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

export type IconButtonProps = {
    name: any;
    color: string;
    onPress: () => void;
}

const IconButton = (props: IconButtonProps) => {
    return (
        <Pressable maxW="96" onPress={props.onPress} style={styles.icon}>
          {({isHovered, isFocused, isPressed}) => {
          return (
            <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "transparent"} style={{transform: [{scale: isPressed ? 0.96 : 1}]}}>
                <Ionicons name={props.name} size={24} color={props.color} />
            </Box>
          )
        }}
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
   icon: {
    margin: 10
   }
})
