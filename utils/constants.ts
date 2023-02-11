export const Colors = {
    primary: "#217074",
    primary2: "#EDC5AB",
    secondary: "#37745B",
    tertiary: "#8B9D77",
    text: "#E7EAEF",
}

export const CUSTOM_SEARCH_KEYS = {
    CUISINE: 'Cuisine',
    DIET: 'Diet',
    TYPE: 'Type'
}

export const CUSTOM_SEARCH = {
    [CUSTOM_SEARCH_KEYS.CUISINE]: [
        {label: "African", value: "African"}, {label: "American", value: "American"}, {label: "British", value: "British"}, 
        {label: "Cajun", value: "Cajun"}, {label: "Caribbean", value: "Caribbean"}, {label: "Chinese", value: "Chinese"}, 
        {label: "Eastern European", value: "Eastern_European"}, {label: "European", value: "European"}, {label: "French", value: "French"}, 
        {label: "German", value: "German"}, {label: "Greek", value: "Greek"}, {label: "Indian", value: "Indian"}, 
        {label: "Irish", value: "Irish"}, {label: "Italian", value: "Italian"}, {label: "Japanese", value: "Japanese"}, 
        {label: "Jewish", value: "Jewish"}, {label: "Korean", value: "Korean"}, {label: "Latin American", value: "Latin_American"}, 
        {label: "Mediterranean", value: "Mediterranean"}, {label: "Mexican", value: "Mexican"}, {label: "Middle Eastern", value: "Middle_Eastern"}, 
        {label: "Nordic", value: "Nordic"}, {label: "Southern", value: "Southern"}, {label: "Spanish", value: "Spanish"}, 
        {label: "Thai", value: "Thai"}, {label: "Vietnamese", value: "Vietnamese"}, 
    ],
    [CUSTOM_SEARCH_KEYS.DIET]: [
        {label: "Gluten_Free", value: "Gluten_Free"}, {label: "Ketogenic", value: "Ketogenic"}, {label: "Vegetarian", value: "Vegetarian"}, 
        {label: "Lacto Vegetarian", value: "Lacto-Vegetarian"}, {label: "Ovo Vegetarian", value: "Ovo-Vegetarian"}, {label: "Vegan", value: "Vegan"}, 
        {label: "Pescetarian", value: "Pescetarian"}, {label: "Paleo", value: "Paleo"}, {label: "Primal", value: "Primal"}, 
        {label: "Low Fodmap", value: "Low-FODMAP"}, {label: "Whole 30", value: "Whole30"}, 
    ],
    [CUSTOM_SEARCH_KEYS.TYPE]: [
        {label: "Dessert", value: "dessert"}, {label: "Appetizer", value: "appetizer"}, {label: "Salad", value: "salad"}, 
        {label: "Bread", value: "bread"}, {label: "Breakfast", value: "breakfast"}, {label: "Soup", value: "soup"}, 
        {label: "Beverage", value: "beverage"}, {label: "Sauce", value: "sauce"}, {label: "Marinade", value: "marinade"}, 
        {label: "Fingerfood", value: "fingerfood"}, {label: "Snack", value: "snack"}, {label: "Drink", value: "drink"}, 
    ],
}

export const HELPER_TEXTS = {
    customSearch: "You can search for a recipe using custom properties. First specify whether You want to search for a cuisine, diet or dish type. Then Pick one or many given properties to select proper recipe.",
    baseSearch: "Enter dish name to search. For example: pasta, to view dishes that include pasta."
}
