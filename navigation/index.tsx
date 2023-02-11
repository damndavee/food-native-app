import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList, RootTabParamList } from "../utils/types";
import { Colors } from "../utils/constants";

import withSearchByScreen from "../containers/withSearchByScreen";
import SearchByScreen from "../screens/SearchByScreen";
import withMyRecipiesScreen from "../containers/withMyRecipiesScreen";
import MyRecipiesScreen from "../screens/MyRecipiesScreen";
import withRecipiesListScreen from "../containers/withRecipiesListScreen";
import RecipiesListScreen from "../screens/Recipe/RecipiesListScreen";
import withRecipeDetailsScreen from "../containers/withRecipeDetailsScreen";
import RecipeDetailsScreen from "../screens/Recipe/RecipeDetailsScreen";
import withShoppingListScreen from "../containers/withShoppingListScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import withAddCustomRecipeScreen from "../containers/withAddCustomRecipeScreen";
import AddCustomRecipeScreen from "../screens/AddCustomRecipeScreen";

import IconButton from "../components/IconButton";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const Tab = createMaterialTopTabNavigator();

const EnhancedSearchByScreen = withSearchByScreen(SearchByScreen);
const EnhancedRecipiesListScreen = withRecipiesListScreen(RecipiesListScreen);
const EnhancedMyRecipiesListScreen = withMyRecipiesScreen(MyRecipiesScreen)
const EnhancedRecipiesDetailsScreen = withRecipeDetailsScreen(RecipeDetailsScreen);
const EnhancedShoppingListScreen = withShoppingListScreen(ShoppingListScreen);
const EnhancedAddCustomRecipeScreen = withAddCustomRecipeScreen(AddCustomRecipeScreen);

export enum NavigationScreens {
    RECIPE_DETAILS_SCREEN = 'RecipeDetailsScreen',
    RECIPIES_LIST_SCREEN = 'RecipiesListScreen',
    ADD_CUSTOM_RECIPE_SCREEN = "AddCustomRecipeScreen",
    MY_RECIPIES = 'MyRecipiesScreen',
    SEARCH_BY_RECIPE = "SearchByRecipeScreen",
    SEARCH_BY_CUSTOM = "SearchByCustomScreem",
    SHOPPING_LIST_SCREEN = "ShoppingListScreen",
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.text,
        }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="AddCustomRecipeScreen" component={EnhancedAddCustomRecipeScreen} options={{
                title: "Add new recipe"
            }} />
            <Stack.Screen name="RecipeDetailsScreen" component={EnhancedRecipiesDetailsScreen} options={{
                title: "Details",
            }} />
            <Stack.Screen name="RecipiesListScreen" component={EnhancedRecipiesListScreen} options={{
                title: "Recipies List",
            }} />
        </Stack.Navigator>
    )
}

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator screenOptions={({navigation}) => ({
            headerStyle: {
                backgroundColor: Colors.primary,
                elevation: 0
            },
            headerTintColor: Colors.text,
            tabBarLabelStyle: {
                fontSize: 11,
                marginBottom: 5
            },
            tabBarStyle: {
                backgroundColor: Colors.primary
            },
            tabBarActiveTintColor: Colors.tertiary,
            tabBarInactiveTintColor: Colors.text,
            headerRight: () => {
                return (
                    <IconButton color={Colors.text} name="add-circle" onPress={() => navigation.navigate(NavigationScreens.ADD_CUSTOM_RECIPE_SCREEN)} />
                )
            }
        })}>
            <BottomTab.Screen name="SearchByScreen" component={TabNavigator} options={{
                title: "Search By",
                tabBarIcon: ({color, size}) => <Ionicons name="search-circle" color={color} size={size * 1.2} />,
            }} />
            <BottomTab.Screen name="MyRecipiesScreen" component={EnhancedMyRecipiesListScreen} options={{
                title: "My Recipes",
                tabBarIcon: ({color, size}) => <Ionicons name="list-circle" color={color} size={size * 1.2} />,
            }} />
            <BottomTab.Screen name="ShoppingListScreen" component={EnhancedShoppingListScreen} options={{
                title: "Shopping List",
                tabBarIcon: ({color, size}) => <Ionicons name="receipt" color={color} size={size * 1.2} />,
            }} />
        </BottomTab.Navigator>
    )
}

function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: Colors.primary,
                borderTopWidth: 0,
                elevation: 0,
            },
            tabBarActiveTintColor: Colors.text,
        }}>
            <Tab.Screen name="RecipeSearch" component={EnhancedSearchByScreen} options={{
                title: "Recipe Search",
            }} />
            <Tab.Screen name="CustomSearch" component={EnhancedSearchByScreen} options={{
                title: "Custom Search"
            }} />
        </Tab.Navigator>
    )
}