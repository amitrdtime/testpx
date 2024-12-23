'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('zip_code', [
      {
        "code": 99501,
        "city": "Anchorage",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99701,
        "city": "Fairbanks",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99611,
        "city": "Homer",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99603,
        "city": "Kenai",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99515,
        "city": "Juneau",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99801,
        "city": "Sitka",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99664,
        "city": "Kodiak",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99654,
        "city": "Wasilla",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99577,
        "city": "Palmer",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99567,
        "city": "Bethel",
        "countryRegionCode": "US",
        "state": "Alaska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 35203,
        "city": "Birmingham",
        "countryRegionCode": "US",
        "state": "Alabama",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 72201,
        "city": "Little Rock",
        "countryRegionCode": "US",
        "state": "Arkansas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 85001,
        "city": "Phoenix",
        "countryRegionCode": "US",
        "state": "Arizona",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 90001,
        "city": "Los Angeles",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 94101,
        "city": "San Francisco",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 92101,
        "city": "San Diego",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 95814,
        "city": "Sacramento",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 92614,
        "city": "Irvine",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 91730,
        "city": "Rancho Cucamonga",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 94501,
        "city": "Alameda",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 91301,
        "city": "Thousand Oaks",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 94566,
        "city": "Pleasanton",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 95101,
        "city": "San Jose",
        "countryRegionCode": "US",
        "state": "California",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 80201,
        "city": "Denver",
        "countryRegionCode": "US",
        "state": "Colorado",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 6103,
        "city": "Hartford",
        "countryRegionCode": "US",
        "state": "Connecticut",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 19901,
        "city": "Dover",
        "countryRegionCode": "US",
        "state": "Delaware",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 20001,
        "city": "Washington",
        "countryRegionCode": "US",
        "state": "District of Columbia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 33101,
        "city": "Miami",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 32801,
        "city": "Orlando",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 32201,
        "city": "Jacksonville",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 33139,
        "city": "Miami Beach",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 33601,
        "city": "Tampa",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 33401,
        "city": "West Palm Beach",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 34201,
        "city": "Sarasota",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 33010,
        "city": "Hialeah",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 34601,
        "city": "Brooksville",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 32114,
        "city": "Daytona Beach",
        "countryRegionCode": "US",
        "state": "Florida",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 30301,
        "city": "Atlanta",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 30303,
        "city": "Savannah",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 30305,
        "city": "Augusta",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 30002,
        "city": "Athens",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 30265,
        "city": "Peachtree City",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 30076,
        "city": "Roswell",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 31401,
        "city": "Macon",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 30720,
        "city": "Dalton",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 30501,
        "city": "Gainesville",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 30281,
        "city": "Stockbridge",
        "countryRegionCode": "US",
        "state": "Georgia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 96801,
        "city": "Honolulu",
        "countryRegionCode": "US",
        "state": "Hawaii",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 83201,
        "city": "Pocatello",
        "countryRegionCode": "US",
        "state": "Idaho",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 60601,
        "city": "Chicago",
        "countryRegionCode": "US",
        "state": "Illinois",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 46201,
        "city": "Indianapolis",
        "countryRegionCode": "US",
        "state": "Indiana",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 50301,
        "city": "Des Moines",
        "countryRegionCode": "US",
        "state": "Iowa",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 67201,
        "city": "Wichita",
        "countryRegionCode": "US",
        "state": "Kansas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 40502,
        "city": "Lexington",
        "countryRegionCode": "US",
        "state": "Kentucky",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 70112,
        "city": "New Orleans",
        "countryRegionCode": "US",
        "state": "Louisiana",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 4101,
        "city": "Portland",
        "countryRegionCode": "US",
        "state": "Maine",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 21201,
        "city": "Baltimore",
        "countryRegionCode": "US",
        "state": "Maryland",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 2101,
        "city": "Boston",
        "countryRegionCode": "US",
        "state": "Massachusetts",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 48201,
        "city": "Detroit",
        "countryRegionCode": "US",
        "state": "Michigan",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 55401,
        "city": "Minneapolis",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 55101,
        "city": "Saint Paul",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 55403,
        "city": "Rochester",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 55343,
        "city": "Edina",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 55404,
        "city": "Bloomington",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 56001,
        "city": "Mankato",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 56301,
        "city": "St. Cloud",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 55075,
        "city": "Inver Grove Heights",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 55110,
        "city": "White Bear Lake",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 55802,
        "city": "Duluth",
        "countryRegionCode": "US",
        "state": "Minnesota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 39201,
        "city": "Jackson",
        "countryRegionCode": "US",
        "state": "Mississippi",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 63101,
        "city": "St. Louis",
        "countryRegionCode": "US",
        "state": "Missouri",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 59601,
        "city": "Helena",
        "countryRegionCode": "US",
        "state": "Montana",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 68101,
        "city": "Omaha",
        "countryRegionCode": "US",
        "state": "Nebraska",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 89501,
        "city": "Reno",
        "countryRegionCode": "US",
        "state": "Nevada",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 3301,
        "city": "Concord",
        "countryRegionCode": "US",
        "state": "New Hampshire",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 8601,
        "city": "Trenton",
        "countryRegionCode": "US",
        "state": "New Jersey",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 87501,
        "city": "Santa Fe",
        "countryRegionCode": "US",
        "state": "New Mexico",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 10001,
        "city": "New York",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 10002,
        "city": "Manhattan",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 14620,
        "city": "Rochester",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 12201,
        "city": "Albany",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 11201,
        "city": "Brooklyn",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 13020,
        "city": "Syracuse",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 13021,
        "city": "Ithaca",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 11530,
        "city": "Hempstead",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 12550,
        "city": "Poughkeepsie",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 14623,
        "city": "Rochester",
        "countryRegionCode": "US",
        "state": "New York",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 27501,
        "city": "Raleigh",
        "countryRegionCode": "US",
        "state": "North Carolina",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 58102,
        "city": "Fargo",
        "countryRegionCode": "US",
        "state": "North Dakota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 44101,
        "city": "Cleveland",
        "countryRegionCode": "US",
        "state": "Ohio",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 73101,
        "city": "Oklahoma City",
        "countryRegionCode": "US",
        "state": "Oklahoma",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 97201,
        "city": "Portland",
        "countryRegionCode": "US",
        "state": "Oregon",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 19103,
        "city": "Philadelphia",
        "countryRegionCode": "US",
        "state": "Pennsylvania",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 2901,
        "city": "Providence",
        "countryRegionCode": "US",
        "state": "Rhode Island",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 29201,
        "city": "Columbia",
        "countryRegionCode": "US",
        "state": "South Carolina",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 57101,
        "city": "Sioux Falls",
        "countryRegionCode": "US",
        "state": "South Dakota",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 37201,
        "city": "Nashville",
        "countryRegionCode": "US",
        "state": "Tennessee",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 73301,
        "city": "Austin",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 75201,
        "city": "Dallas",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 77001,
        "city": "Houston",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 78701,
        "city": "San Antonio",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 75211,
        "city": "Fort Worth",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 79901,
        "city": "El Paso",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 77550,
        "city": "Galveston",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 76102,
        "city": "Arlington",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 78664,
        "city": "Round Rock",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 77573,
        "city": "League City",
        "countryRegionCode": "US",
        "state": "Texas",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 84101,
        "city": "Salt Lake City",
        "countryRegionCode": "US",
        "state": "Utah",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 5602,
        "city": "Montpelier",
        "countryRegionCode": "US",
        "state": "Vermont",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 23220,
        "city": "Richmond",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 22101,
        "city": "McLean",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 24502,
        "city": "Lynchburg",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 20110,
        "city": "Manassas",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 23320,
        "city": "Chesapeake",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 24060,
        "city": "Blacksburg",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 24541,
        "city": "Danville",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 22180,
        "city": "Vienna",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 22901,
        "city": "Charlottesville",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 22003,
        "city": "Annandale",
        "countryRegionCode": "US",
        "state": "Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 98001,
        "city": "Auburn",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 98004,
        "city": "Bellevue",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 98003,
        "city": "Federal Way",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 98007,
        "city": "Redmond",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 98101,
        "city": "Seattle",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 98501,
        "city": "Olympia",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 98201,
        "city": "Everett",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 98607,
        "city": "Camas",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 99301,
        "city": "Kennewick",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 98022,
        "city": "Enumclaw",
        "countryRegionCode": "US",
        "state": "Washington",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 25301,
        "city": "Charleston",
        "countryRegionCode": "US",
        "state": "West Virginia",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 53701,
        "city": "Madison",
        "countryRegionCode": "US",
        "state": "Wisconsin",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": 82001,
        "city": "Cheyenne",
        "countryRegionCode": "US",
        "state": "Wyoming",
        "timeZone": "",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('zip_code', {}, {});
  }
};
