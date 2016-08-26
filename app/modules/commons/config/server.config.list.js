module.exports = {
  yg: {
    helios: {
      mobile_server: 'http://115.231.96.71:9000',
      crash_server:''
    },production: {
      mobile_server: 'http://115.231.96.71:9001',
      crash_server:''
    },testHelios:{
      mobile_server: 'http://172.16.10.59:9000',
    },testMedusa:{
      mobile_server: 'http://172.16.10.59:9001',
    },integration: {
      mobile_server: 'http://115.231.96.71:9000',
      crash_server:''
    },development: {
      // mobile_server: 'http://172.16.208.189:9001',
      // mobile_server: 'http://172.16.10.59:8888',
      mobile_server: 'http://172.16.10.59:9001',
      // mobile_server: 'http://115.231.96.71:9001',  
      // mobile_server: 'http://115.231.96.71:9001',
      crash_server:''
      // http://localhost:9000
      // http://172.16.10.59:9000 172.16.101.3
    }
  }
}


