import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [data, setData] = React.useState({
    username: 'vinhanh@gmail.com',
    password: '123456789',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  // check mail
  const isEmail = value => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!regex.test(String(value).toLowerCase());
  };

  // gán giá trị vào state
  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: isEmail(val),
        isValidUser: isEmail(val),
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: isEmail(val),
        isValidUser: isEmail(val),
      });
    }
  };

  // check passwword xem có đúng ko
  const handlePasswordChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  // check  Text rỗng
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  // validate mail
  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: isEmail(val),
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  //handle đăng nhập
  const loginHandle = async () => {
    // navigation.navigate('SignUpScreen')
    const {username, password} = data;
    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    } else {
      // kiểm tra đăng nhập auth
      await auth()
        .signInWithEmailAndPassword(username, password)
        .then(async function (result) {
          navigation.navigate('Home');
        })
        .catch(function (error) {
          if (error.code === 'auth/invalid-email') {
            Alert.alert('Thất bại!', 'Email bạn nhập không hợp lệ!', [
              {text: 'Okay'},
            ]);
          } else {
            if (error.code === 'auth/wrong-password') {
              Alert.alert(
                'Thông báo!',
                'Thông tin email hoặc password không chính xác!',
                [{text: 'Okay'}],
              );
            } else {
              Alert.alert(
                'Thông báo!',
                'Đăng nhập thất bại! Vui lòng thử lại!',
                [{text: 'Okay'}],
              );
            }
          }
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFF', height: '100%', flex: 1}}>
      <Image
        source={require('../../images/Avatar/avatar.png')}
        style={styles.ViewImage}
      />

      <View style={styles.ViewTextInput}>
        <Icon name="mail" color="#5abd8c" size={24} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#5abd8c"
          style={{paddingHorizontal: 10, marginRight: 10, width: width / 2.2}}
          autoCapitalize="none"
          onChangeText={val => textInputChange(val)}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          defaultValue={data.username}
        />
        {data.check_textInputChange ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        ) : null}
      </View>
      {data.isValidUser ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Vui lòng nhập email hợp lệ</Text>
        </Animatable.View>
      )}

      <View style={styles.ViewTextInput}>
        <Icon name="md-lock-closed" color="#5abd8c" size={28} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#5abd8c"
          style={{paddingHorizontal: 10, marginRight: 10, width: width / 2.2}}
          secureTextEntry={data.secureTextEntry ? true : false}
          autoCapitalize="none"
          onChangeText={val => handlePasswordChange(val)}
          defaultValue={data.password}
        />
        <TouchableOpacity
          onPress={updateSecureTextEntry}
          style={{justifyContent: 'flex-end'}}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" color="#5abd8c" size={22} />
          ) : (
            <Feather name="eye" color="#5abd8c" size={22} />
          )}
        </TouchableOpacity>
      </View>
      {data.isValidPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Mật khẩu phải có ít nhất 6 ký tự.</Text>
        </Animatable.View>
      )}
      <TouchableOpacity
        onPress={() => {
          loginHandle(data.username, data.password);
        }}
        style={styles.ViewButtom}>
        <Text style={styles.TxtLogin}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.TxtRegister}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Login;
