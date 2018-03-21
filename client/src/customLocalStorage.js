import axios from 'axios';

export default {
    setItem: (key, value, loggedInUser = false) => {
      localStorage.setItem('lastUpdateTime', Date.now());
      const returnValue = localStorage.setItem(key, value);
      if (loggedInUser) {
        axios('https://momentum-server-bt13.herokuapp.com/api/updateLocalStorage', {
                method: 'post',
                data: localStorage,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => console.log(res.data))
            .catch(err => console.log(err));
      }

      return returnValue;
    },
    
    getItem: (key) => {
      const returnValue = localStorage.getItem(key);
      return returnValue;
    }
}