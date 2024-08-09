import {View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profilepages, Search, Orderlist} from '../components';
import {
  HomeIcon,
  NotifIcon,
  OrderIcon,
  ProfileIcon,
  SearchIcon,
} from '../components/microcomponents/carticon/icon';
import {boxcolor} from '../components/colors';
import Notification from '../components/pages/Notification';

const Tab = createBottomTabNavigator();
const Mainscreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: boxcolor,

        tabBarStyle: {
          borderRadius: 15,
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          elevation: 5,
          overflow: 'hidden',
          height: 70,
          paddingBottom: 35,
          paddingTop: 25,
          backgroundColor: 'rgba(200,200,255,.7)',
        },
        headerShown: false,
        tabBarLabelStyle: {
          width: 80,
          height: 80,
          borderRadius: 15,
          bottom: -45,
          position: 'absolute',
          color: 'transparent',
          // backgroundColor: '#55323232',
          zIndex: -1,
          overflow: 'hidden',
        },
        tabBarBadgeStyle: {
          marginRight: 10,
        },
        tabBarIconStyle: {
          bottom: 4,
          position: 'absolute',
        },
        tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: true,
        tabBarInactiveBackgroundColor: '#ffff',
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => (
            <HomeIcon fill={color} focused={focused} />
          ),
        })}
      />
      <Tab.Screen
        name="notification"
        component={Notification}
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => (
            <NotifIcon fill={color} focused={focused} />
          ),
        })}
      />
      <Tab.Screen
        name="orderlist"
        component={Orderlist}
        options={{
          tabBarIcon: ({color, focused}) => (
            <OrderIcon fill={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profilepages}
        options={{
          tabBarIcon: ({color, focused}) => (
            <ProfileIcon fill={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Mainscreen;
