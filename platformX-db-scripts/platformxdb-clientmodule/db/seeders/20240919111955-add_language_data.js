'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('language',[
      {
       "code": "BGR",
       "name": "Bulgarian",
       "windowsLanguageId": 1026,
       "windowsLanguageName": "Bulgarian (Bulgaria)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "CHS",
       "name": "Simplified Chinese",
       "windowsLanguageId": 2052,
       "windowsLanguageName": "Chinese (Simplified, China)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "CSY",
       "name": "Czech",
       "windowsLanguageId": 1029,
       "windowsLanguageName": "Czech (Czechia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "DAN",
       "name": "Danish",
       "windowsLanguageId": 1030,
       "windowsLanguageName": "Danish (Denmark)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "DEA",
       "name": "German (Austrian)",
       "windowsLanguageId": 3079,
       "windowsLanguageName": "German (Austria)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "DES",
       "name": "German (Swiss)",
       "windowsLanguageId": 2055,
       "windowsLanguageName": "German (Switzerland)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "DEU",
       "name": "German",
       "windowsLanguageId": 1031,
       "windowsLanguageName": "German (Germany)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ELL",
       "name": "Greek",
       "windowsLanguageId": 1032,
       "windowsLanguageName": "Greek (Greece)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ENA",
       "name": "English (Australian)",
       "windowsLanguageId": 3081,
       "windowsLanguageName": "English (Australia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ENC",
       "name": "English (Canadian)",
       "windowsLanguageId": 4105,
       "windowsLanguageName": "English (Canada)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ENG",
       "name": "English (United Kingdom)",
       "windowsLanguageId": 2057,
       "windowsLanguageName": "English (United Kingdom)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ENI",
       "name": "English (Ireland)",
       "windowsLanguageId": 6153,
       "windowsLanguageName": "English (Ireland)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ENP",
       "name": "English (Philippines)",
       "windowsLanguageId": 13321,
       "windowsLanguageName": "English (Philippines)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ENU",
       "name": "English",
       "windowsLanguageId": 1033,
       "windowsLanguageName": "English (United States)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ENZ",
       "name": "English (New Zealand)",
       "windowsLanguageId": 5129,
       "windowsLanguageName": "English (New Zealand)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ESM",
       "name": "Spanish (Mexico)",
       "windowsLanguageId": 2058,
       "windowsLanguageName": "Spanish (Mexico)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ESO",
       "name": "Spanish (Colombia)",
       "windowsLanguageId": 9226,
       "windowsLanguageName": "Spanish (Colombia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ESP",
       "name": "Spanish",
       "windowsLanguageId": 1034,
       "windowsLanguageName": "Spanish (Spain, International Sort, Traditional Sort)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ESR",
       "name": "Spanish (Peru)",
       "windowsLanguageId": 10250,
       "windowsLanguageName": "Spanish (Peru)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ESS",
       "name": "Spanish (Argentine)",
       "windowsLanguageId": 11274,
       "windowsLanguageName": "Spanish (Argentina)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ETI",
       "name": "Estonian",
       "windowsLanguageId": 1061,
       "windowsLanguageName": "Estonian (Estonia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "FIN",
       "name": "Finnish",
       "windowsLanguageId": 1035,
       "windowsLanguageName": "Finnish (Finland)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "FRA",
       "name": "French",
       "windowsLanguageId": 1036,
       "windowsLanguageName": "French (France)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "FRB",
       "name": "French (Belgian)",
       "windowsLanguageId": 2060,
       "windowsLanguageName": "French (Belgium)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "FRC",
       "name": "French (Canadian)",
       "windowsLanguageId": 3084,
       "windowsLanguageName": "French (Canada)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "FRS",
       "name": "French (Swiss)",
       "windowsLanguageId": 4108,
       "windowsLanguageName": "French (Switzerland)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "HRV",
       "name": "Croatian",
       "windowsLanguageId": 1050,
       "windowsLanguageName": "Croatian (Croatia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "HUN",
       "name": "Hungarian",
       "windowsLanguageId": 1038,
       "windowsLanguageName": "Hungarian (Hungary)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "IND",
       "name": "Indonesian",
       "windowsLanguageId": 1057,
       "windowsLanguageName": "Indonesian (Indonesia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ISL",
       "name": "Icelandic",
       "windowsLanguageId": 1039,
       "windowsLanguageName": "Icelandic (Iceland)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ITA",
       "name": "Italian",
       "windowsLanguageId": 1040,
       "windowsLanguageName": "Italian (Italy)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ITS",
       "name": "Italian (Swiss)",
       "windowsLanguageId": 2064,
       "windowsLanguageName": "Italian (Switzerland)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "JPN",
       "name": "Japanese",
       "windowsLanguageId": 1041,
       "windowsLanguageName": "Japanese (Japan)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "KOR",
       "name": "Korean",
       "windowsLanguageId": 1042,
       "windowsLanguageName": "Korean (Korea)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "LTH",
       "name": "Lithuanian",
       "windowsLanguageId": 1063,
       "windowsLanguageName": "Lithuanian (Lithuania)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "LVI",
       "name": "Latvian",
       "windowsLanguageId": 1062,
       "windowsLanguageName": "Latvian (Latvia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "MSL",
       "name": "Malaysian",
       "windowsLanguageId": 1086,
       "windowsLanguageName": "Malay (Malaysia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "NLB",
       "name": "Dutch (Belgian)",
       "windowsLanguageId": 2067,
       "windowsLanguageName": "Dutch (Belgium)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "NLD",
       "name": "Dutch",
       "windowsLanguageId": 1043,
       "windowsLanguageName": "Dutch (Netherlands)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "NON",
       "name": "Norwegian (Nynorsk)",
       "windowsLanguageId": 2068,
       "windowsLanguageName": "Norwegian Nynorsk (Norway)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "NOR",
       "name": "Norwegian",
       "windowsLanguageId": 1044,
       "windowsLanguageName": "Norwegian Bokmål (Norway)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "PLK",
       "name": "Polish",
       "windowsLanguageId": 1045,
       "windowsLanguageName": "Polish (Poland)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "PTB",
       "name": "Portuguese (Brazil)",
       "windowsLanguageId": 1046,
       "windowsLanguageName": "Portuguese (Brazil)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "PTG",
       "name": "Portuguese",
       "windowsLanguageId": 2070,
       "windowsLanguageName": "Portuguese (Portugal)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "ROM",
       "name": "Romanian",
       "windowsLanguageId": 1048,
       "windowsLanguageName": "Romanian (Romania)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "RUS",
       "name": "Russian",
       "windowsLanguageId": 1049,
       "windowsLanguageName": "Russian (Russia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "SKY",
       "name": "Slovak",
       "windowsLanguageId": 1051,
       "windowsLanguageName": "Slovak (Slovakia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "SLV",
       "name": "Slovene",
       "windowsLanguageId": 1060,
       "windowsLanguageName": "Slovenian (Slovenia)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "SRP",
       "name": "Serbian",
       "windowsLanguageId": 11290,
       "windowsLanguageName": "Serbian (Latin, Montenegro)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "SVE",
       "name": "Swedish",
       "windowsLanguageId": 1053,
       "windowsLanguageName": "Swedish (Sweden)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "THA",
       "name": "Thai",
       "windowsLanguageId": 1054,
       "windowsLanguageName": "Thai (Thailand)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "TRK",
       "name": "Turkish",
       "windowsLanguageId": 1055,
       "windowsLanguageName": "Turkish (Türkiye)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "code": "UKR",
       "name": "Ukrainian",
       "windowsLanguageId": 1058,
       "windowsLanguageName": "Ukrainian (Ukraine)",
       "createdAt": new Date(),
       "updatedAt": new Date()
      }
     ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('language', {}, {});
  }
};
