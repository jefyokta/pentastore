import { Text,View, SafeAreaView, TouchableOpacity } from 'react-native'
import Container from '../microcomponents/container'
import HeaderBack from '../microcomponents/HeaderBack'

const Setting = ()=>{



    return (
      <Container>
        <SafeAreaView style={{minHeight: '100%'}}>
          <HeaderBack text={'Setting'} />
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,.1)',
              height: 100,
              width: '%',
              borderRadius: 10,
              margin: 10,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,.1)',
                height: 100,
                width: '%',
                borderRadius: 10,
                margin: 10,
              }}>
                <Text>Update profile</Text>
              </View>
          </View>
        </SafeAreaView>
      </Container>
    );
}

export default Setting