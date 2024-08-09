import {View, StyleSheet} from 'react-native';
import SvgUri from 'react-native-svg-uri-maintained';
import {boxcolor} from '../../../colors';
import {Svg, Path} from 'react-native-svg';

const HomeIcon = ({fill = 'red', focused}) => {
  return (
    <View style={focused ? style.tabbutton : style.tabbutton2}>
      <SvgUri
        source={require('./home2.svg')}
        width="30"
        height="30"
        fill={fill}
      />
    </View>
  );
};
const ProfileIcon = ({fill = 'red', focused}) => {
  return (
    <View style={focused ? style.tabbutton : style.tabbutton2}>
      <SvgUri
        source={require('./profile.svg')}
        width="30"
        height="30"
        fill={fill}
      />
    </View>
  );
};
const OrderIcon = ({fill = 'red', focused}) => {
  return (
    <View style={focused ? style.tabbutton : style.tabbutton2}>
      <SvgUri
        source={require('./order1.svg')}
        width="30"
        height="30"
        fill={fill}
      />
    </View>
  );
};
const OrderIcon2 = ({fill = 'red', focused}) => {
  return (
    <View style={focused ? style.tabbutton : style.tabbutton2}>
      <SvgUri
        source={require('./order2.svg')}
        width="30"
        height="30"
        fill={fill}
      />
    </View>
  );
};
const SearchIcon = ({fill = 'red', focused}) => {
  return (
    <View style={focused ? style.tabbutton : style.tabbutton2}>
      <SvgUri
        source={require('./search2.svg')}
        width="20"
        height="20"
        fill={fill}
      />
    </View>
  );
};
const NotifIcon = ({fill = 'black', focused}) => {
  return (
    <View style={focused ? style.tabbutton : style.tabbutton2}>
      <SvgUri
        source={require('./chat.svg')}
        width="30"
        height="30"
        fill={fill}
      />
    </View>
  );
};
const EyeIcon = style => {
  return (
    <View style={style}>
      <SvgUri source={require('./eye.svg')} width="20" height="20" />
    </View>
  );
};
const EyeIcon2 = style => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./eyeslash.svg')}
        width="20"
        height="20"
        fill="white"
      />
    </View>
  );
};
const EyeIcon3 = style => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./eye2.svg')}
        width="20"
        height="20"
        fill="white"
      />
    </View>
  );
};
const ErrorIcon = style => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./error.svg')}
        width="20"
        height="20"
        fill="red"
      />
    </View>
  );
};
const CartCheck = ({style = {width: 20}}) => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./cart-check-svgrepo-com.svg')}
        width={style.width || '20'}
        height={style.width || '20'}
        fill="white"
      />
    </View>
  );
};
const BackIcon = style => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./back.svg')}
        width="20"
        height="20"
        fill="white"
      />
    </View>
  );
};
const GameIcon = style => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./game-svgrepo-com.svg')}
        width="100"
        height="250"
        style={{
          top: 0,
          position: 'absolute',
          bottom: 0,
          right: 0,
          // width: 250,
        }}

        // fill="white"
      />
    </View>
  );
};
const WebAppIcon = style => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./code-svgrepo-com.svg')}
        width="100"
        height="150"
        style={{
          top: 5,
          position: 'absolute',
          // bottom: 0,
          right: -20,
          // width: 250,
        }}

        // fill="white"
      />
    </View>
  );
};
const CloudIcon = style => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./cloud-database-svgrepo-com.svg')}
        width="100"
        height="150"
        style={{
          top: 0,
          position: 'absolute',
          // bottom: 0,
          right: -20,
          // width: 250,
        }}

        // fill="white"
      />
    </View>
  );
};
const AppleIcon = style => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./apple-svgrepo-com.svg')}
        width="100"
        height="150"
        style={{
          top: -30,
          position: 'absolute',
          // bottom: 0,
          right: 5,
          // width: 250,
        }}

        // fill="white"
      />
    </View>
  );
};
const MessageIcon = style => {
  return (
    <View style={style}>
      <SvgUri
        source={require('./message-svgrepo-com.svg')}
        width="100"
        height="150"
        style={{
          top: -30,
          position: 'absolute',
          // bottom: 0,
          right: 0,
          // width: 250,
        }}

        // fill="white"
      />
    </View>
  );
};
const MailIcon = ({style, svg = 'cart'}) => {
  return (
    <View style={style}>
      <SvgUri
        source={require(`./mail-01-svgrepo-com.svg`)}
        width="30"
        height="30"
        style={
          {
            // top: -30,
            // position: 'absolute',
            // bottom: 0,
            // right: 0,
            // width: 250,
          }
        }
        fill="white"
      />
    </View>
  );
};
const PersonIcon = ({style, svg = 'cart'}) => {
  return (
    <View style={style}>
      <SvgUri
        source={require(`./user-02-svgrepo-com.svg`)}
        width="30"
        height="30"
        style={
          {
            // top: -30,
            // position: 'absolute',
            // bottom: 0,
            // right: 0,
            // width: 250,
          }
        }
        fill="white"
      />
    </View>
  );
};
const SettingIcon = ({style, svg = 'cart'}) => {
  return (
    <View style={style}>
      <SvgUri
        source={require(`./settings-svgrepo-com.svg`)}
        width="30"
        height="30"
        style={
          {
            // top: -30,
            // position: 'absolute',
            // bottom: 0,
            // right: 0,
            // width: 250,
          }
        }
        fill="white"
      />
    </View>
  );
};
const EmptyIcon = ({style, svg = 'cart'}) => {
  return (
    <View style={style}>
      <SvgUri
        source={require(`./empty.svg`)}
        width="0"
        height="0"
        style={
          {
            // top: -30,
            // position: 'absolute',
            // bottom: 0,
            // right: 0,
            // width: 250,
          }
        }
        fill="white"
      />
    </View>
  );
};
const AddIcon = ({style}) => {
  return (
    <View style={style}>
      <SvgUri
        source={require(`./add-circle-svgrepo-com.svg`)}
        width="70"
        height="70"
        style={
          {
            // top: -30,
            // position: 'absolute',
            // bottom: 0,
            // right: 0,
            // width: 250,
          }
        }
        fill="white"
      />
    </View>
  );
};
const StarIcon = ({style, fill = 'none'}) => {
  return (
    <View style={style}>
      <SvgUri
        source={require(`./star-svgrepo-com.svg`)}
        width="25"
        height="25"
        style={
          {
            // top: -30,
            // position: 'absolute',
            // bottom: 0,
            // right: 0,
            // width: 250,
          }
        }
        fill={fill}
      />
    </View>
  );
};
const PowerIcon = ({style, fill = 'none'}) => {
  return (
    <View style={style}>
      <SvgUri
        source={require(`./logout-svgrepo-com.svg`)}
        width="36"
        height="36"
        style={
          {
            // top: -30,
            // position: 'absolute',
            // bottom: 0,
            // right: 0,
            // width: 250,
          }
        }
        // fill={fill}
      />
    </View>
  );
};

const style = StyleSheet.create({
  tabbutton: {
    width: 65,
    height: 65,
    backgroundColor: boxcolor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    marginTop: 15,
  },
  tabbutton2: {
    width: 75,
    height: 75,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 15,
  },
});

export {
  HomeIcon,
  ProfileIcon,
  OrderIcon,
  OrderIcon2,
  SearchIcon,
  EyeIcon,
  ErrorIcon,
  EyeIcon2,
  EyeIcon3,
  NotifIcon,
  BackIcon,
  GameIcon,
  WebAppIcon,
  CloudIcon,
  AppleIcon,
  MessageIcon,
  CartCheck,
  MailIcon,
  PersonIcon,
  EmptyIcon,
  SettingIcon,
  AddIcon,
  StarIcon,
  PowerIcon,
};
