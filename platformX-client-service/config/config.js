export default {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'UserService',
    password: 'Innover@2024',
    port: 2024, // Default PostgreSQL port
    D365_API_Base_URL:'https://api.businesscentral.dynamics.com',
    D365_API_URL: 'https://api.businesscentral.dynamics.com/v2.0/a494276d-ad3b-44d9-83b5-4ae7a8531c92/ProdCopy/api/v2.0/companies(b352ed7c-d6d0-ed11-a7c9-000d3a3238b8)/customers',//process.env.D365_API_URL,
    D365_API_MetaData_URL: `https://api.businesscentral.dynamics.com/v2.0/a494276d-ad3b-44d9-83b5-4ae7a8531c92/ProdCopy/ODataV4/Company('InnoverDigital%20LLC')`,
    DYNAMIC_URL:'https://innovertimesheet.azurewebsites.net',
    ACCESS_TOKEN: '',
    D365_env:'ProdCopy',
    companyName:'InnoverDigital%20LLC',
    companyId:'b352ed7c-d6d0-ed11-a7c9-000d3a3238b8',
    tenantId:'a494276d-ad3b-44d9-83b5-4ae7a8531c92',
    API_Version:'v2.0'
  };