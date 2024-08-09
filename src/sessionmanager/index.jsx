import axios from 'axios';
import ServerUri from '../const';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const result = await axios.get(`${ServerUri}/token`);
    if (!result) {
      return false;
    } else {
      // console.log(result);
      return result.data.accesstoken;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
const getCrosstoken = async () => {
  try {
    const result = await axios.get(`${ServerUri}/user/crosstoken`);
    console.log(result)
    return result.data.crosstoken;
  } catch (error) {
    console.log(error);
  }
};

export {getToken, getCrosstoken};
