import { Text, SafeAreaView, StyleSheet, View, Image, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { useEffect, useState } from "react";
import { Icon } from 'react-native-elements';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function List({navigation,route}) {
const userName=route.params?.userName || "Guest";
const [data,Setdata]=useState([]);
const [selectedItem,SetselectedItem]=useState(null);
const [searchQuery,SetsearchQuery]=useState('');
  // const [loading, Isloading] = useState(true);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
const [newName, setNewName] = useState('');


useEffect(()=> {
  Getdata();
  return ()=>{}
},[]);
  const Getdata = () => {
    const ApriUrl="https://6458b31d8badff578ef82d32.mockapi.io/bao";
    fetch(ApriUrl,{method:"GET"})
    .then((res) => res.json())
    .then((resJson)=>{Setdata(resJson)})
    .catch((error)  => {
      console.log('Error' + error);
    })
  };
  const SaveEdit=()=>{
      if(selectedItem){
        const ApriUrl=`https://6458b31d8badff578ef82d32.mockapi.io/bao/${selectedItem.id}`;
        fetch(ApriUrl,{
          method:"PUT",
          headers :  { 'Content-Type': 'application/json' },
          body : JSON.stringify({name:newName}),
      }).then((res)=> res.json())
      .then((updateItem)=>{
        Setdata(prevData=>prevData.map(i=>i.id === selectedItem.id?updateItem : i));
          setEditModalVisible(false);
      }).catch((error)=>{
        console.log("Error"+error)
      })

  }
  };
  const Delete=(item)=>{
    const ApriUrl=`https://6458b31d8badff578ef82d32.mockapi.io/bao/${item.id}`;
    fetch(ApriUrl,{
      method:"Delete"
    }).then((res)=>{
      if(res.ok){
        Setdata((prevData)=>prevData.filter((i)=>i.id!==item.id))
        console.log("Delete succes")
      }else{
        console.log("delete falid")
      }
    }).catch((error)=>{
       console.log('Error' + error);
    })
  };
  const openEditModal=(item)=>{
    SetselectedItem(item);
    setNewName(item.name);
    setEditModalVisible(true);
  }
  const renderItem=({item}) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'space-between',with: "95%",height:40,borderRadius:10,marginTop:15,backgroundColor:'blue'}}>
      <TextInput value={item.name} style={{ color: "white", fontWeight: 700, width: "85%", fontSize: 15 }} editable={false}></TextInput>
     
      <TouchableOpacity onPress={()=> openEditModal(item)}>
         <Image source={require("./edit.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> Delete(item)}>
         <Image source={require("./delete.png")} />
      </TouchableOpacity>
      
    </View>
  );
};

return (
  <SafeAreaView style={styles.container}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Icon name="arrow-back" size={22} color="#000" type="material"/>
      </TouchableOpacity>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Image source={require("./Frame.png")}/>
        <View>
        <Text style={{ fontWeight: 700, fontSize: 25 }}>Hi {userName}</Text>
        <Text style={{ fontWeight: 700, fontSize: 25 }}>Have a good day</Text>
      </View>
      </View>
      
    </View>
    <View style={{marginTop:50,height:50,width:"90%",flexDirection:'row',alignItems:'center',padding:7,borderRadius:5,borderWidth:1}}>
          <Icon name="search" size={22} color="#000" type="material" />
          <TextInput placeholder="Tìm kiếm"
           style={{ color: "gray", width: "100%", height: 30 }}
              value={searchQuery} // Gán giá trị tìm kiếm
              onChangeText={(text) => SetsearchQuery(text)}
          ></TextInput>
      </View>
      <FlatList
      style={{marginTop:20}}
       data={data}
       renderItem={renderItem}
       keyExtractor={item => item.id}
         showsVerticalScrollIndicator={false} 
      />
      <View style={{marginTop : 50,alignItems:'center'}}>
        <TouchableOpacity style={{width:65,height:65}} onPress={()=> navigation.navigate("Add",{Setdata})}>
          <Image source={require("./plus.png")} style={{width:50,height:50}}/>
        </TouchableOpacity>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={()=> setEditModalVisible(false)}
      >
      <View style={{flex: 1,justifyContent: "center",alignItems: "center",backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
        <Text>EDIT STAK</Text>
        <TextInput style={{ height: 40,borderColor: 'gray',borderWidth: 1,width: 250,paddingHorizontal: 10,marginBottom: 20,backgroundColor: 'white',}} value={newName} onChangeText={setNewName}></TextInput>
        <TouchableOpacity style={{backgroundColor:'#00BDD6',padding:10,borderRadius:10}} onPress={SaveEdit}>
           <Text style={{ color: 'white', fontWeight: '700' }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#FF6347',borderRadius:10,marginTop:10}} onPress={() => setEditModalVisible(false)}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </Modal>
  </SafeAreaView>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 10,
  },

});
