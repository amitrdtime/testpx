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
    return queryInterface.bulkInsert('format_region',[
      {
       "name": "English (Canada)",
       "language": 4105,
       "region": "en-CA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Irish (Ireland)",
       "language": 2108,
       "region": "ga-IE",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "isiXhosa (South Africa)",
       "language": 1076,
       "region": "xh-ZA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "isiZulu (South Africa)",
       "language": 1077,
       "region": "zu-ZA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Italian (Italy)",
       "language": 1040,
       "region": "it-IT",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Italian (Switzerland)",
       "language": 2064,
       "region": "it-CH",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Japanese (Japan)",
       "language": 1041,
       "region": "ja-JP",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Kalaallisut (Greenland)",
       "language": 1135,
       "region": "kl-GL",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Kannada (India)",
       "language": 1099,
       "region": "kn-IN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Kazakh (Kazakhstan)",
       "language": 1087,
       "region": "kk-KZ",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Khmer (Cambodia)",
       "language": 1107,
       "region": "km-KH",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "K'iche' (Guatemala)",
       "language": 1158,
       "region": "quc-Latn-GT",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Kinyarwanda (Rwanda)",
       "language": 1159,
       "region": "rw-RW",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Kiswahili (Kenya)",
       "language": 1089,
       "region": "sw-KE",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Konkani (India)",
       "language": 1111,
       "region": "kok-IN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Korean (Korea)",
       "language": 1042,
       "region": "ko-KR",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Kyrgyz (Kyrgyzstan)",
       "language": 1088,
       "region": "ky-KG",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Lao (Laos)",
       "language": 1108,
       "region": "lo-LA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Latvian (Latvia)",
       "language": 1062,
       "region": "lv-LV",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Lithuanian (Lithuania)",
       "language": 1063,
       "region": "lt-LT",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Lower Sorbian (Germany)",
       "language": 2094,
       "region": "dsb-DE",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Luxembourgish (Luxembourg)",
       "language": 1134,
       "region": "lb-LU",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Macedonian (North Macedonia)",
       "language": 1071,
       "region": "mk-MK",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Malay (Brunei)",
       "language": 2110,
       "region": "ms-BN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Malay (Malaysia)",
       "language": 1086,
       "region": "ms-MY",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Malayalam (India)",
       "language": 1100,
       "region": "ml-IN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Maltese (Malta)",
       "language": 1082,
       "region": "mt-MT",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Maori (New Zealand)",
       "language": 1153,
       "region": "mi-NZ",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Mapuche (Chile)",
       "language": 1146,
       "region": "arn-CL",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Marathi (India)",
       "language": 1102,
       "region": "mr-IN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Mohawk (Mohawk)",
       "language": 1148,
       "region": "moh-CA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Mongolian (Mongolia)",
       "language": 1104,
       "region": "mn-MN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Mongolian (Traditional Mongolian, China)",
       "language": 2128,
       "region": "mn-Mong-CN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Mongolian (Traditional Mongolian, Mongolia)",
       "language": 3152,
       "region": "mn-Mong-MN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Nepali (India)",
       "language": 2145,
       "region": "ne-IN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Nepali (Nepal)",
       "language": 1121,
       "region": "ne-NP",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Norwegian Nynorsk (Norway)",
       "language": 2068,
       "region": "nn-NO",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Spanish (Puerto Rico)",
       "language": 20490,
       "region": "es-PR",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Spanish (Spain, International Sort, Modern Sort)",
       "language": 3082,
       "region": "es-ES",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Spanish (Spain, Traditional Sort)",
       "language": 1034,
       "region": "es-ES_tradnl",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Spanish (United States)",
       "language": 21514,
       "region": "es-US",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Spanish (Uruguay)",
       "language": 14346,
       "region": "es-UY",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Spanish (Venezuela)",
       "language": 8202,
       "region": "es-VE",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Swedish (Finland)",
       "language": 2077,
       "region": "sv-FI",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Swedish (Sweden)",
       "language": 1053,
       "region": "sv-SE",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Syriac (Syria)",
       "language": 1114,
       "region": "syr-SY",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Tajik (Cyrillic, Tajikistan)",
       "language": 1064,
       "region": "tg-Cyrl-TJ",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Tamil (India)",
       "language": 1097,
       "region": "ta-IN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Tamil (Sri Lanka)",
       "language": 2121,
       "region": "ta-LK",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Tatar (Russia)",
       "language": 1092,
       "region": "tt-RU",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Telugu (India)",
       "language": 1098,
       "region": "te-IN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Thai (Thailand)",
       "language": 1054,
       "region": "th-TH",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Tibetan (China)",
       "language": 1105,
       "region": "bo-CN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Tigrinya (Eritrea)",
       "language": 2163,
       "region": "ti-ER",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Tigrinya (Ethiopia)",
       "language": 1139,
       "region": "ti-ET",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Turkish (Türkiye)",
       "language": 1055,
       "region": "tr-TR",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Turkmen (Turkmenistan)",
       "language": 1090,
       "region": "tk-TM",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Ukrainian (Ukraine)",
       "language": 1058,
       "region": "uk-UA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Upper Sorbian (Germany)",
       "language": 1070,
       "region": "hsb-DE",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Urdu (India)",
       "language": 2080,
       "region": "ur-IN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Urdu (Pakistan)",
       "language": 1056,
       "region": "ur-PK",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Uyghur (China)",
       "language": 1152,
       "region": "ug-CN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Uzbek (Cyrillic, Uzbekistan)",
       "language": 2115,
       "region": "uz-Cyrl-UZ",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Uzbek (Latin, Uzbekistan)",
       "language": 1091,
       "region": "uz-Latn-UZ",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Valencian (Spain)",
       "language": 2051,
       "region": "ca-ES-valencia",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Vietnamese (Vietnam)",
       "language": 1066,
       "region": "vi-VN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Welsh (United Kingdom)",
       "language": 1106,
       "region": "cy-GB",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Western Frisian (Netherlands)",
       "language": 1122,
       "region": "fy-NL",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Wolof (Senegal)",
       "language": 1160,
       "region": "wo-SN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Xitsonga (South Africa)",
       "language": 1073,
       "region": "ts-ZA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Yi (China)",
       "language": 1144,
       "region": "ii-CN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Yoruba (Nigeria)",
       "language": 1130,
       "region": "yo-NG",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Serbian (Latin, Serbia)",
       "language": 9242,
       "region": "sr-Latn-RS",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Sesotho (South Africa)",
       "language": 1072,
       "region": "st-ZA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Sesotho sa Leboa (South Africa)",
       "language": 1132,
       "region": "nso-ZA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Setswana (Botswana)",
       "language": 2098,
       "region": "tn-BW",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Setswana (South Africa)",
       "language": 1074,
       "region": "tn-ZA",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Sindhi (Devanagari, India)",
       "language": 1113,
       "region": "sd-Deva-IN",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Sindhi (Pakistan)",
       "language": 2137,
       "region": "sd-Arab-PK",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Sinhala (Sri Lanka)",
       "language": 1115,
       "region": "si-LK",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Slovak (Slovakia)",
       "language": 1051,
       "region": "sk-SK",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Slovenian (Slovenia)",
       "language": 1060,
       "region": "sl-SI",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Somali (Somalia)",
       "language": 1143,
       "region": "so-SO",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Spanish (Argentina)",
       "language": 11274,
       "region": "es-AR",
       "createdAt": new Date(),
       "updatedAt": new Date()
      },
      {
       "name": "Spanish (Bolivia)",
       "language": 16394,
       "region": "es-BO",
       "createdAt": new Date(),
       "updatedAt": new Date()
      }
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('format_region', {}, {});
  }
};
