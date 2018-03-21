import axios from 'axios';

export default {
    setItem: (key, value, loggedInUser = false) => {
      const returnValue = localStorage.setItem(key, value);

      if (loggedInUser) {
        axios('https://momentum-server-bt13.herokuapp.com/api/update_todo', {
                method: 'post',
                data: JSON.parse(localStorage.getItem('todo')),
                withCredentials: true,
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(res => console.log(res))
            .catch(err => console.log(err));
      }

      return returnValue;
    },
    
    getItem: (key) => {
      const returnValue = localStorage.getItem(key);
      return returnValue;
    }
}