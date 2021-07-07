import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Entypo';
import DataProduct from '../../Data/DataProduct';
import styles from './styles';
import {convertToNumberCommas} from '../../utilities/index';
const DataProducts = DataProduct;
// if (typeof item.avatarImageHot != 'undefined')
const Home = ({navigation}) => {
  const renderItemProductSales = ({item, index}) => {
    if (item.sales) {
        return (
          <TouchableOpacity
            key={index}
            opacity={1}
            style={styles.ButtomDetail}
            onPress={() => {
              console.log(item);
              navigation.navigate('Detail', {dataItem: item});
            }}>
            <Image
              source={item.avatarImage}
              style={styles.ViewImageProducts}
            />
            <Text numberOfLines={5} style={styles.ViewTitilePro}>
              {item.nameProducts}
            </Text>
            <Text numberOfLines={1} style={styles.TxtAuthor}>
              by {item.author}
            </Text>
            <Text numberOfLines={1} style={styles.TxtPrice}>
              price: {convertToNumberCommas(item.price)} Đồng
            </Text>
    
            
    
        
          </TouchableOpacity>
        )
      }
    }
    
    const renderItemProductLikes = ({item, index}) => {
      if (item.like) {
          return (
            <TouchableOpacity
              key={index}
              opacity={1}
              style={styles.ButtomDetail}
              onPress={() => {
                console.log(item);
                navigation.navigate('Detail', {dataItem: item});
              }}>
              <Image
                source={item.avatarImage}
                style={styles.ViewImageProducts}
              />
              <Text numberOfLines={5} style={styles.ViewTitilePro}>
                {item.nameProducts}
              </Text>
              <Text numberOfLines={1} style={styles.TxtAuthor}>
                by {item.author}
              </Text>
              <Text numberOfLines={1} style={styles.TxtPrice}>
                price: {convertToNumberCommas(item.price)} Đồng
              </Text>
      
              
      
          
            </TouchableOpacity>
          )
        }
      }
      

  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Image
        resizeMode="stretch"
        source={require('../../images/Avatar/homeScreenGreenCircle.png')}
        style={styles.ImageHeader}
      />
      <View style={{marginTop: -210}}>
        
        <View style={styles.ViewHeader}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Thông báo!', 'Bạn có muốn đăng xuất', [
                {text: 'Hủy'},
                {text: 'Chấp nhận', onPress: () => navigation.goBack()},
              ]);
            }}>
            <Icon3 name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
            BOOKS STORE
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ShoppingCart');
            }}>
            <Icon1 name="shoppingcart" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* View tìm kiếm */}
        <View style={{marginTop: 20, marginBottom: 20, alignSelf: 'center'}}>
          <Image
            source={require('../../images/Avatar/openingScreenNil.png')}
            style={{height: 190, width: 200}}
            resizeMode="stretch"
          />
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.TxtTextInput}>Tìm kiếm sách...</Text>
          </TouchableOpacity>
        </View>
        
      
          

        {/* View danh sách cách sách */}
        
          <View style={styles.ViewTitileProducts}>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>Dành cho bạn</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            
              marginTop: 10,
              
            }}>
            <View style={Object.assign({}, styles.ViewLine, styles.BackgroundRed)}/>
            <View style={styles.ViewProducts}>
              <FlatList
                data={DataProducts}
                horizontal={true}
                        
                showsHorizontalScrollIndicator={false}
                
                
                keyExtractor={(item, index) => index.toString()}
                
                
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={index}
                    opacity={1}
                    style={styles.ButtomDetail}
                    onPress={() => {
                      console.log(item);
                      navigation.navigate('Detail', {dataItem: item});
                    }}>
                    <Image
                      source={item.avatarImage}
                      style={styles.ViewImageProducts
                      }
                    />
                    <Text numberOfLines={3} style={styles.ViewTitilePro}>
                      {item.nameProducts}
                    </Text>
                    <Text numberOfLines={1} style={styles.TxtAuthor}>
                      by {item.author}
                    </Text>
                    <Text numberOfLines={1} style={styles.TxtPrice}>
                      price: {convertToNumberCommas(item.price)} Đồng
                    </Text>

                    

                
                  </TouchableOpacity>
                  
                  
                )}
               
              />
            </View>
            
          </View>
          
          <View style={styles.ViewTitileProducts}>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>Sách bán chạy</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              
            }}>
            <View style={styles.ViewLine} />
            <View style={styles.ViewProducts}>
              <FlatList
                data={DataProducts}
                horizontal={true}
                
                
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                
                
                renderItem={renderItemProductSales}
               
              />
            </View>
            
          </View>

          <View style={styles.ViewTitileProducts}>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>Sách yêu thích</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              
            }}>
            <View style={styles.ViewLine} />
            <View style={styles.ViewProducts}>
              <FlatList
                data={DataProducts}
                horizontal={true}
                
                
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                
                
                renderItem={renderItemProductLikes}
               
              />
            </View>
            
          </View>

          </View>
          
          
          
         
         
          </ScrollView>
          
    </SafeAreaView>
  );
};
export default Home;
