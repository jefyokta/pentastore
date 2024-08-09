import axios from 'axios';
import ServerUri from '../../const';

const GetDifDay = input => {
  const today = new Date();
  const t = input.split('T')[0];
  const inputs = new Date(t);
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

    return `${dates[2]} ${months[monthname]} ${dates[0]}`;
  }
};

class Calender {
  constructor() {
    this.date = new Date();
  }
  getyear() {
    return this.date.getFullYear();
  }
}

const kalender = new Calender();

const getRating = async id => {
  try {
      const r = await axios.get(`${ServerUri}/rating?productid=${id}`);
      return r.data.rating;
    
  } catch (error) {
    console.log(error)
    return "1"
    
  }

};
export {GetDifDay, kalender, getRating};
