import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// or any files within the Snack
import AssetExample from './components/AssetExample';
import Home from "./Home";
import List from './List';
import Add from './Add';
const Stack= createNativeStackNavigator();
const App=() => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
     <Stack.Screen name="Home" component={Home} options={{headerShown : false}}/>
     <Stack.Screen name="List" component={List} options={{headerShown : false}}/>
     <Stack.Screen  name="Add" component={Add} options={{headerShown:false}}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}


export default App;