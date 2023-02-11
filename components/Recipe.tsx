import { memo } from "react";
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { Image, Pressable, Box, Heading, Stack, AspectRatio, Center, Text, HStack } from "native-base";
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../utils/constants';

import { RecipeType } from '../store/recipe/recipe.types';
import { NavigationScreens } from "../navigation";

type RecipeProps = {
    recipe: RecipeType
}

const Recipe = ({recipe}: RecipeProps) => {
  const navigation = useNavigation();

  const handleSelectRecipe = () => {
    navigation.navigate(NavigationScreens.RECIPE_DETAILS_SCREEN, {
      recipeId: recipe.id
    });
  }

  return (
    <TouchableOpacity style={styles.rootContainer} onPress={handleSelectRecipe}>
      <Box overflow="hidden">
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{uri: recipe.image}} alt={recipe.title} resizeMode="cover" />
          </AspectRatio>
          <Center bg={Colors.primary2} _text={{color: Colors.secondary, fontWeight: "700", fontSize: "xs"}} position="absolute" bottom="0" px="2" py="1">
            Click for details
          </Center>
        </Box>
        <Stack padding={1}>
            <Heading size="xs" textAlign="center" color={Colors.text}>
                {(recipe.title.length > 35) ? recipe.title.slice(0, 35-1) + '...' : recipe.title}
            </Heading>
        </Stack>
      </Box>
    </TouchableOpacity>
  )
}

function arePropsEqual(prevProps: RecipeProps, nextProps: RecipeProps) {
  return prevProps.recipe === nextProps.recipe;
}

export default memo(Recipe, arePropsEqual);

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 8,
    overflow: Platform.select({ios: 'visible', android: 'hidden'}),
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    width: 200,
    elevation: 4,
    flex: 1,
    margin: 10
  },
})