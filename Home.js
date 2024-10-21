import { Text, SafeAreaView, StyleSheet,TouchableOpacity,Image,View,TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import {createContext,useState} from 'react';
import { Card } from 'react-native-paper';
import AssetExample from './components/AssetExample';

export default function Home({navigation}) {
  const [name,Setname]=useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent:'center',alignItems:"center",marginTop :10 }}>
        <Image source={require("./to-do-list_text.png")} style={{width:"100%",height:280}}/>
      </View>
      <Text style={{fontWeight:800,marginTop : 50,textAlign:'center',color: "#8353E2",fontSize:30}}> MANAGE YOUR TASK</Text>
      <View style={{marginTop : 40,alignItems:'center'}}>
        <View style={{flexDirection:'row',borderRadius:10,borderWidth:1,width:"90%",height:40,padding: 10}}>
          <View style = {{width: 30, height: 30, justifyContent: "center", alignItems: "center" }}>
            <Icon name="mail" size={22} color="#000" type="material" />
          </View>
            <TextInput placeholder="Enter your name" value={name} onChangeText={Setname} ></TextInput>
        </View>
      </View>
      <View style={{justifyContent:'center',alignItems:'center',marginTop:50}}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor:"#00BDD6",height:50,width:"70%",borderRadius:10}}
        onPress={()=>{
          navigation.navigate("List",{userName:name});
        }}>
        <Text style={{fontSize:20,fontWeight:500,textAlign:'center',justifyContent:'center'}}>GET STARTED</Text>

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
  });
  