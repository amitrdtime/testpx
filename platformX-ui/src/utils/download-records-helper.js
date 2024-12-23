import { saveAs } from 'file-saver';
import { getClients, getSows, getProjects } from "../services/client-service";
import { formatDate } from "../utils/use-helper";


// Function to escape double quotes and wrap field in double quotes if necessary
const escapeCSVField = (field) => {
    if (typeof field === 'string') {
      // Escape double quotes by replacing " with ""
      const escapedField = field.replace(/"/g, '""');
      // If the field contains commas or quotes, wrap it in double quotes
      if (escapedField.includes(',') || escapedField.includes('"')) {
        return `"${escapedField}"`;
      }
      return escapedField;
    }
    return field;
};

export const downloadClientRecords = async () => {

    try {
        const clientsDetails = await getClients({});
        
        const csvData = clientsDetails.data.map(client => ({
            customerNo: client.customerNo,
            customerName: escapeCSVField(client.name),
            countryRegionName: client.countryRegionName,
            state: client.state,
            city: client.city,
            zipCode: client.zipCode,
            address: escapeCSVField(client.address),
            address2: escapeCSVField(client.address2),
            phoneNo: client.phoneNo,
            mobilePhoneNo: client.mobilePhoneNo,
            email: escapeCSVField(client.email),
            faxNo: client.faxNo,
            website: escapeCSVField(client.website),
            languageCode: escapeCSVField(client.languageCode),
            languageName: escapeCSVField(client.languageName),
            formatRegionName: escapeCSVField(client.formatRegionName),
            formatRegionRegion: escapeCSVField(client.formatRegionRegion),
            contactNo: client.contactNo,
            contactName: escapeCSVField(client.contactName),
            createdBy: escapeCSVField(client.createdBy),
            createdAt: escapeCSVField(formatDate(client.createdAt)),
            modifiedBy: escapeCSVField(client.modifiedBy),
            updatedAt: escapeCSVField(formatDate(client.updatedAt))
          }));
      
          const csvContent = [
            [
                'Customer No',
                'Customer Name',
                'Country',
                'State',
                'City',
                'Zip Code',
                'Address',
                'Address 2',
                'Phone No',
                'Mobile Phone No',
                'Email',
                'Fax No',
                'Website',
                'Language Code',
                'Language Name',
                'Format Region Name',
                'Format Region',
                'Contact No',
                'Contact Name',
                'Created By',
                'Created At',
                'Modified By',
                'Updated At'],
            ...csvData.map(item => [
                                item.customerNo, 
                                item.customerName, 
                                item.countryRegionName, 
                                item.state, 
                                item.city,
                                item.zipCode, 
                                item.address,
                                item.address2,
                                item.phoneNo,
                                item.mobilePhoneNo,
                                item.email,
                                item.faxNo,
                                item.website,
                                item.languageCode,
                                item.languageName,
                                item.formatRegionName,
                                item.formatRegionRegion,
                                item.contactNo,
                                item.contactName,
                                item.createdBy,
                                item.createdAt,
                                item.modifiedBy,
                                item.updatedAt
                            ]),
          ]
            .map(e => e.join(','))
            .join('\n');
      
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'Customer_records.csv');
      
     } catch (err) {
       console.log(err);
     }
    
   
};

export const downloadSOWRecords = async (clientId) => {
    try {
        const sowDetails = await getSows(clientId,{});

        const csvData = sowDetails.data.map(sow => ({
            sowNo: sow.sowNo,
            description: escapeCSVField(sow.description),
            customerNo: sow.customerNo,
            customerName: escapeCSVField(sow.customerName),
            countryRegion: sow.countryRegion,
            cityToState: escapeCSVField(sow.cityToState),
            city: escapeCSVField(sow.city),
            zipCode: sow.zipCode,
            address: escapeCSVField(sow.address),
            address2: escapeCSVField(sow.address2),
            contactNo: sow.contactNo,
            phoneNo: sow.phoneNo,
            mobileNo: sow.mobileNo,
            email: escapeCSVField(sow.email),
            contact: escapeCSVField(sow.contact),
            projectManagerNo: sow.projectManagerNo,
            projectManagerName: escapeCSVField(sow.projectManagerName),
            personResponsibleNo: sow.personResponsibleNo,
            personResponsibleName: escapeCSVField(sow.personResponsibleName),
            jobType: escapeCSVField(sow.jobType),
            sowStatus: escapeCSVField(sow.sowStatus),
            exchCalculationCost: sow.exchCalculationCost,
            exchCalculationPrice: sow.exchCalculationPrice,
            blocked: sow.blocked,
            projectPosting: escapeCSVField(sow.projectPosting),
            locationCode: escapeCSVField(sow.locationCode),
            invoiceCurrencyCode: escapeCSVField(sow.invoiceCurrencyCode),
            currencyCode: escapeCSVField(sow.currencyCode),
            startingDate: escapeCSVField(formatDate(sow.startingDate)),
            endingDate: escapeCSVField(formatDate(sow.endingDate)),
            createdAt: escapeCSVField(formatDate(sow.createdAt)),
            createdBy: escapeCSVField(sow.createdBy),
            updatedAt: escapeCSVField(formatDate(sow.updatedAt)),
            modifiedBy: escapeCSVField(sow.modifiedBy)
          }));
          
          const csvContent = [
            [
              'SOW No',
              'Description',
              'Customer No',
              'Customer Name',
              'Country Region',
              'State',
              'City',
              'Zip Code',
              'Address',
              'Address 2',
              'Contact No',
              'Phone No',
              'Mobile No',
              'Email',
              'Contact',
              'Project Manager No',
              'Project Manager Name',
              'Person Responsible No',
              'Person Responsible Name',
              'Job Type',
              'SOW Status',
              'Exchange Calculation Cost',
              'Exchange Calculation Price',
              'Blocked',
              'Project Posting',
              'Location Code',
              'Invoice Currency Code',
              'Currency Code',
              'Starting Date',
              'Ending Date',
              'Created At',
              'Created By',
              'Updated At',
              'Modified By'
            ],
            ...csvData.map(item => [
              item.sowNo,
              item.description,
              item.customerNo,
              item.customerName,
              item.countryRegion,
              item.cityToState,
              item.city,
              item.zipCode,
              item.address,
              item.address2,
              item.contactNo,
              item.phoneNo,
              item.mobileNo,
              item.email,
              item.contact,
              item.projectManagerNo,
              item.projectManagerName,
              item.personResponsibleNo,
              item.personResponsibleName,
              item.jobType,
              item.sowStatus,
              item.exchCalculationCost,
              item.exchCalculationPrice,
              item.blocked,
              item.projectPosting,
              item.locationCode,
              item.invoiceCurrencyCode,
              item.currencyCode,
              item.startingDate,
              item.endingDate,
              item.createdAt,
              item.createdBy,
              item.updatedAt,
              item.modifiedBy
            ]),
          ]
            .map(e => e.join(','))
            .join('\n');
          
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'SOW_records.csv');
      
     } catch (err) {
       console.log(err);
     }
   
};

export const downloadProjectsRecords = async (clientId, sowId) => {
    try {
        const projectDetails = await getProjects(clientId, sowId);
        const csvData = projectDetails.data.map(project => ({
            customerNo: project.customerNo,
            customerName: escapeCSVField(project.customerName),
            sowNo: escapeCSVField(project.sowNo),
            projectNo: escapeCSVField(project.projectNo),
            description: escapeCSVField(project.description),
            projectPostingGroupName: escapeCSVField(project.projectPostingGroupName),
            wipMethodName: escapeCSVField(project.wipMethodName),
            locationName: escapeCSVField(project.locationName),
            createdBy: escapeCSVField(project.createdBy),
            modifiedBy: escapeCSVField(project.modifiedBy),
            projectCreatedDate: escapeCSVField(formatDate(project.projectCreatedDate)),
            startDate: escapeCSVField(formatDate(project.startDate)),
            endDate: escapeCSVField(formatDate(project.endDate)),
            createdAt: escapeCSVField(formatDate(project.createdAt)),
            updatedAt: escapeCSVField(formatDate(project.updatedAt))
        }));
        
        const csvContent = [
            [
                'Customer No',
                'Customer Name',
                'SOW No',
                'Project No',
                'Description',
                'Project Posting Group Name',
                'WIP Method Name',
                'Location Name',
                'Created By',
                'Modified By',
                'Project Created Date',
                'Start Date',
                'End Date',
                'Created At',
                'Updated At'
            ],
            ...csvData.map(item => [
                item.customerNo,
                item.customerName,
                item.sowNo,
                item.projectNo,
                item.description,
                item.projectPostingGroupName,
                item.wipMethodName,
                item.locationName,
                item.createdBy,
                item.modifiedBy,
                item.projectCreatedDate,
                item.startDate,
                item.endDate,
                item.createdAt,
                item.updatedAt
            ])
        ]
            .map(e => e.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'project_records.csv');
        
    }catch(err) {
        console.log(err);
    }
};


