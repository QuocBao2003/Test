import { Text, SafeAreaView, StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { createContext, useState } from 'react';
// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function Add({navigation,route}) {
  const [task,Settask]=useState("");
  const Setdata=route.params?.Setdata;
  const Add=()=>{
     const newItem = { name: task };
    if (newItem.name.trim() === '') {
      return; // Không thêm nếu ô nhập trống
    }
    const ApiUrl = "https://6458b31d8badff578ef82d32.mockapi.io/bao";
    fetch(ApiUrl, {
      method: "POST", 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
    .then((res) => res.json())
    .then((addedItem) => {
      // Sau khi thêm dữ liệu thành công, cập nhật danh sách bằng Setdata
      Setdata(prevData => [...prevData, addedItem]);
      navigation.goBack();  // Quay lại màn hình trước
    })
    .catch((error) => {
      console.log("Error:" +error);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginTop :10}} >
        <Icon name="arrow-back" size={22} color="#000" type="material" />
      </TouchableOpacity>
      <View style={{height:300,width:"100%",alignItems:'center'}}>
        <Image source={require("./to-do-list_text.png")}/>
      </View>
        <Text style={{color:'#8353E2',fontSize:25,fontWeight:700,textAlign:'center',marginTop:60}}>ADD YOUR TASK</Text>

        <View style={{flexDirection:'row',marginTop:30,alignItems:'center',padding:7,borderRadius:10,borderWidth:1}}>
          <View style = {{width: 30, height: 30, justifyContent: "center", alignItems: "center", }}>
        <Icon name="add" size={22} color="#000" type="material" />
        </View>
        <TextInput placeholder="Enter yuor task" value={task} onChangeText={Settask}></TextInput>
        </View>
        <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={{flexDirection:"row",width:"50%",height:30,borderRadius:10,backgroundColor:'blue',justifyContent:'center',alignItems:'center'}} onPress={()=>Add()}  >
            <Text style={{fontWeight:700,fontSize:10,color:'white'}}>DONE</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    padding: 8,
  },
 
});
