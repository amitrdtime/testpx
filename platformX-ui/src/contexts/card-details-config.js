export const clientDetails = (clientDetail) => {
  return [
    { label: "Customer Name", value: clientDetail?.name || "" },
    { label: "Customer No.", value: clientDetail?.customerNo || "" },
    { label: "Address 1", value: clientDetail?.address || "" },
    { label: "Address 2", value: clientDetail?.address2 || "" },
    { label: "Country Region Code", value: clientDetail?.countryRegionName || "" },
    { label: "City", value: clientDetail?.city || "" },
    { label: "State", value: clientDetail?.state || "" },
    { label: "Zip Code", value: clientDetail?.zipCode || "" },
    { label: "Phone No", value: clientDetail?.phoneNo || "" },
    { label: "Mobile Phone No.", value: clientDetail?.mobilePhoneNo || "" },
    { label: "Email", value: clientDetail?.email || "" },
    { label: "Fax No.", value: clientDetail?.faxNo || "" },
    { label: "Home Page", value: clientDetail?.website || "" },
    { label: "Language Code", value: clientDetail?.languageCode || "" },
    { label: "Format Region", value: clientDetail?.formatRegionName || "" },
    { label: "Contact Code", value: clientDetail?.contactNo || "" },
    { label: "Contact Name", value: clientDetail?.contactName || "" },
    { label: "Created Date", value: clientDetail?.createdAt || "" },
    { label: "Modified Date", value: clientDetail?.updatedAt || "" },
  ];
};

export const sowDetails = (sowData) => {
  return [
    { label: "Description", value: sowData?.description || "" },
    { label: "SOW No.", value: sowData?.sowNo || "" },
    { label: "Customer No.", value: sowData?.customerNo || "" },
    { label: "Customer Name", value: sowData?.customerName || "" },
    {
      label: "Person Responsible",
      value: sowData?.personResponsibleNo || "",
    },
    {label: "Last Date Modified",value: sowData?.updatedAt || ""},
    { label: "Job Type", value: sowData?.jobType || "" },
    { label: "Project Manager", value: sowData?.projectManagerName || "" },
    { label: "Blocked", value: sowData?.blocked || "" },
    { label: "SOW Status", value: sowData?.sowStatus || "" },
    { label: "Project Posting", value: sowData?.projectPosting || "" },
    { label: "Location Code", value: sowData?.locationCode || "" },
    { label: "Starting Date", value: sowData?.startingDate || "" },
    { label: "Ending Date", value: sowData?.endingDate || "" },
    { label: "Creation Date", value: sowData?.createdAt || "" },
    { label: "Currency Code", value: sowData?.currencyCode || "" },
    { label: "Invoice Currency", value: sowData?.invoiceCurrencyCode || "" },
    { label: "Exch. Calculation (Cost)", value: sowData?.exchCalculationCost || "" },
    { label: "Exch. Calculation (Price)", value: sowData?.exchCalculationPrice || "" },
  ];
};

export const projectDetails = (projectDetail) => {
  return [
    { label: "Customer Name", value: projectDetail?.customerName || "" },
    { label: "Customer No.", value: projectDetail?.customerNo || "" },
    { label: "SOW No.", value: projectDetail?.sowNo || "" },
    { label: "Project Name", value: projectDetail?.description || "" },
    { label: "Project No", value: projectDetail?.projectNo || "" },
    { label: "Project Posting Group Name", value: projectDetail?.projectPostingGroupName || "" },
    { label: "WipMethod Name", value: projectDetail?.wipMethodName || "" },
    { label: "Location Name", value: projectDetail?.locationName || "" },
    { label: "Created By", value: projectDetail?.createdBy || "" },
    { label: "Project Created Date", value: projectDetail?.projectCreatedDate || "" },
    { label: "Start Date", value: projectDetail?.startDate || "" },
    { label: "End Date", value: projectDetail?.endDate || "" },
    { label: "CreatedAt", value: projectDetail?.createdAt || "" }
  ];
};
