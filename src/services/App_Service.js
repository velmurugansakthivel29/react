import { genericRequest } from '../utils/http-service';

const default_options = {
  'credentials': 'same-origin',
  'pragma': 'no-cache',
  'cache-control': 'no-cache'
};

// Method to handle initial App related Services
const AppService = () => {
  return {
    login: (body) => {
      var options = Object.assign({}, default_options, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body)
      });

      return genericRequest(`/api/login`, options);
    },

    data: () => genericRequest('http://dummy.restapiexample.com/api/v1/employees', default_options),

    logout: () => genericRequest('/api/logout', default_options)
  };
};

export default AppService();
