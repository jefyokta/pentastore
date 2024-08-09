import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import ServerUri from '../../const';
import {boxcolor, kuning, third} from '../colors';
import style from '../style';
import Back from '../microcomponents/Backicon';
import Container from '../microcomponents/container';
import HeaderBack from '../microcomponents/HeaderBack';

const Notification = () => {
  const [user, setuser] = useState(null);
  const [notifs, setnotifs] = useState([{createat: '2002-10-06T3823'}]);

  const GetDifDay = input => {
    const today = new Date();
    const t = input.split('T')[0];
    const inputs = new Date(t);
    // console.log(tod);
    const Timedif = inputs ? today - inputs : null;
    const daydif = Math.floor(Timedif / (1000 * 60 * 60 * 24));
    if (daydif == 0) {
      return 'Today';
    } else if (daydif == 1) {
      return 'Yesterday';
    } else {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const m = new Date();
      const dates = t.split('-');
      const month = t.split('-')[1];
      const nmonth = parseInt(month) - 1;
      const monthname = m.getMonth(nmonth);

      return `${dates[2]} ${months[nmonth]} ${dates[0]}`;
    }
  };
  const data = async () => {
    const res = await axios.get(`${ServerUri}/user/mydata`);
    console.log(res.data.id);
    setuser(res.data.id);
  };

  //   useEffect(() => {
  //     data();
  //   }, [user]);

  useEffect(() => {
    const setnotif = async () => {
      const data = async () => {
        const res = await axios.get(`${ServerUri}/user/mydata`);
        console.log(res.data.id);
        return res.data.id;
      };
      const users = await data();
      const notif = await axios.get(`${ServerUri}/notif?userid=${users}`);
      setnotifs(notif.data);
      console.log(notifs);
    };
    setnotif();
  }, []);
  return (
    <Container>
      <SafeAreaView>
<HeaderBack text={'Notification'}/>

        <ScrollView style={{padding: 10, minHeight: '100%'}}>
          {notifs.length > 0 &&
            notifs.map((n, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 'auto',
                    flex: 1,
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderWidth: 0.5,
                    borderColor: 'rgba(255,255,255,.5)',
                  }}>
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        width: '90%',
                        color: third,
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: 5,
                      }}>
                      Pentastore
                    </Text>
                  </View>
                  <View style={{width: '100%'}}>
                    <Text
                      style={{width: '90%', color: 'white', marginBottom: 5}}>
                      {n.text}
                    </Text>
                  </View>
                  <View>
                    <Text style={{textAlign: 'right', color: kuning}}>
                      {GetDifDay(n.createat)}
                      {' at '}
                      {n.createat.split('T')[1].split('.')[0].split(':')[0]}:
                      {n.createat.split('T')[1].split('.')[0].split(':')[1]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          {notifs.length == 0 && (
            <Text style={{textAlign: 'center', margin: 10}}>
              Tidak ada pesan saat ini
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default Notification;
