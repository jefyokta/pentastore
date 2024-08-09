import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Mainscreen from '../mainscreen';
import {
  Loginpage,
  PaymentHandler,
  Registerpage,
  Registerpagev2,
  Search,
} from '../components';
import Splash from '../splash';
import Category from '../components/pages/categories';
import Cart from '../components/pages/Cart';
import PentaIcon from '../components/microcomponents/carticon';
import Product from '../components/pages/product';
import Notification from '../components/pages/Notification';
import Loading from '../components/microcomponents/Loading';
import LogoutModal from '../components/microcomponents/Modalogout';
import PentaLoading from '../components/microcomponents/Pentaload';
import ForgotPass from '../components/pages/forgotpassword';
import VerifyCode from '../components/pages/veriifycode';
import ChangePasswordForgotten from '../components/pages/ChangeForgottenpasss';
import Test from '../test';
import Type from '../components/pages/Type';
import Setting from '../components/pages/Setting';
import OrderDetails from '../components/pages/orderdetails';
import Process from '../components/pages/Processeing';

const Stack = createNativeStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="test"
        component={Cart}
        options={{headerShown: false}}
      /> */}
        <Stack.Screen
          name="main"
          component={Mainscreen}
          options={{headerShown: false}}
        />
      <Stack.Screen
        name="splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="loginpage"
        component={Loginpage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="registerpage"
        component={Registerpage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="registerpage2"
        component={Registerpagev2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="category"
        component={Category}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="cart"
        component={Cart}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="product"
        component={Product}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="forgotpass"
        component={ForgotPass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="verifycode"
        component={VerifyCode}
        options={{headerShown: false}}
      />
     
      <Stack.Screen
        name="changepass"
        component={ChangePasswordForgotten}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="type"
        component={Type}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="orderdetails"
        component={OrderDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="process"
        component={Process}
        options={{headerShown: false}}
      />
     
    </Stack.Navigator>
  );
};

export default Auth;
