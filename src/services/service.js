import axios from 'axios';
import {instances} from './services.path';
import AsyncStorage from '@react-native-async-storage/async-storage';

const printError = error => {
  console.log(error);
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
};

class UserServices {
  constructor() {
    this.client = axios.create({baseURL: 'https://api.mondaa.com.au/'});
    // this.client = axios.create({baseURL: 'http://localhost:3030/'});
    this.controller = new AbortController();
  }

  login = async data => {
    const sth = await new Promise((resolve, reject) => {
      this.client
        .post(instances.login, data)
        .then(response => resolve(response))
        .catch(error => {
          console.log('error: ', error.data);
          this.controller.abort();
          printError(error);
          reject(error);
        });
    });
    return sth;
  };

  forgotPassword = async data => {
    return new Promise((resolve, reject) => {
      this.client
        .post(instances.forgotPassword, data)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  resetPassword = async data => {
    return new Promise((resolve, reject) => {
      this.client
        .post(instances.resetPassword, data)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getEmployees = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getEmployees, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(Error);
          reject(error);
        });
    });
  };
  getOffEmployees = async date => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getEmployeesOff + '/' + date, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(Error);
          reject(error);
        });
    });
  };

  countEmployees = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .get(instances.countEmployees, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(Error);
          reject(error);
        });
    });
  };

  getAllUser = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getAllUser, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getProjectByDate = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .post(instances.getProjectByDate, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getProjectWorker = async param => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getProjectWorker + param, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getUserInfo = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getUserInfo, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getAvatarURL = async access_token => {
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .get(instances.avatarURL, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getAvatar = async url => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {responseType: 'arraybuffer'})
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  setAvatar = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    const sth = await new Promise((resolve, reject) => {
      this.client
        .post(instances.setAvatar, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
    return sth;
  };

  uploadImage = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    return new Promise((resolve, reject) => {
      this.client
        .post(instances.uploadImage, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  setUserInfo = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .patch(instances.setUserInfo, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  updateEmployeeInfo = async (id, data) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .patch(instances.updateEmployeeInfo + id, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  register = async data => {
    return new Promise((resolve, reject) => {
      this.client
        .post(instances.register, data)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          console.log(error);
          reject(error);
        });
    });
  };

  addProject = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .post(instances.addProject, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getAllProject = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getAllProject, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  deleteProject = async id => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .delete(instances.deleteProject + '/' + id, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  addProjectUsers = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .post(instances.addProjectUser, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  removeProjectUsers = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .post(instances.removeProjectUser, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  addProjectLocation = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .post(instances.addProjectLocation, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getAllProjectLocation = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getAllProjectLocation, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();

          reject(error);
        });
    });
  };

  getProjectLocation = async id => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getProjectLocation + '/' + id, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  deleteProjectLocation = async id => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .delete(instances.deleteProjectLocation + '/' + id, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getWorkHours = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .post(instances.getWorkHours, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  getWorkHoursTotal = async (from, to, employeeId) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    const query = `?from=${from}&to=${to}${
      employeeId ? `&employeeId=${employeeId}` : ''
    }`;

    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getWorkHoursTotal + query, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  downloadWorkHours = async (from, to, employeeId) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    const query = `?from=${from}&to=${to}${
      employeeId ? `&employeeId=${employeeId}` : ''
    }`;

    return new Promise((resolve, reject) => {
      this.client
        .get(instances.downloadWorkHours + query, config)
        .then(response => resolve(response))
        .catch(error => {
          printError(error);
          this.controller.abort();
          reject(error);
        });
    });
  };

  getWorkHoursTotalEmployee = async (from, to, employeeId) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };
    const query = `?from=${from}&to=${to}&employeeId=${employeeId}`;

    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getWorkHoursTotalEmployee + query, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  createWorkHour = async data => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .post(instances.addWorkHour, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          reject(error);
        });
    });
  };

  removeWorkHour = async id => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .delete(instances.deleteWorkHour + id, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(error);
          reject(error);
        });
    });
  };

  countProjectUsers = async ({from, to}) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .get(instances.countProjectUsers + `?from=${from}&to=${to}`, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(error);
          reject(error);
        });
    });
  };

  getProjectUsers = async ({from, to}) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .get(instances.getProjectUsers + `?from=${from}&to=${to}`, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(error);
          reject(error);
        });
    });
  };
  setFCMToken = async body => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .post(instances.setFCMToken, body, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(error);
          reject(error);
        });
    });
  };
  sendNotification = async body => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .post(instances.sendNotification, body, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(error);
          reject(error);
        });
    });
  };

  sendNotificationOff = async date => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .post(instances.sendNotificationOff, {date}, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(error);
          reject(error);
        });
    });
  };
  updateProject = async (id, data) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const config = {
      headers: {Authorization: `Bearer ${access_token}`},
    };

    return new Promise((resolve, reject) => {
      this.client
        .patch(instances.updateProject + '/' + id, data, config)
        .then(response => resolve(response))
        .catch(error => {
          this.controller.abort();
          printError(error);
          reject(error);
        });
    });
  };
}

const services = new UserServices();

export default services;
