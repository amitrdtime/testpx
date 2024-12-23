class Resource {
    constructor(resource = {}) {  
      if (typeof resource !== 'object' || resource === null) {
        resource = {}; // Fallback to an empty object if the resource is invalid
      }
      this.OdataEtag = resource["@odata.etag"]??'';
      this.No = resource["No"] ?? '';
      this.Name = resource["Name"] ?? '';
      this.Value = resource["Name"] ?? '';
      this.Name_2 = resource["Name_2"] ?? '';
      this.Type = resource["Type"] ?? '';
      this.Base_Unit_of_Measure = resource["Base_Unit_of_Measure"] ?? '';
      this.Resource_Group_No=resource["Resource_Group_No"] ?? '';
      this.Vendor_No=resource["Vendor_No"] ?? '';
      this.VendorName=resource["VendorName"]?? '';
      this.Resource_Group=resource["Resource_Group"]?? '';
      this.Resource_Group_Category=resource["Resource_Group_Category"]?? '';
      this.Direct_Unit_Cost=resource["Direct_Unit_Cost"]?? '';
      this.Indirect_Cost_Percent=resource["Indirect_Cost_Percent"]?? '';
      this.Unit_Cost=resource["Unit_Cost"]?? '';
      this.Price_Profit_Calculation=resource["Price_Profit_Calculation"]?? '';
      this.Profit_Percent=resource["Profit_Percent"]?? '';
      this.Unit_Price=resource["Unit_Price"]?? '';
      this.Gen_Prod_Posting_Group=resource["Gen_Prod_Posting_Group"]?? '';
      this.VAT_Prod_Posting_Group=resource["VAT_Prod_Posting_Group"]?? '';
      this.Privacy_Blocked=resource["Privacy_Blocked"]?? '';
      this.Search_Name=resource["Search_Name"]?? '';
      this.End_Date=resource["End_Date"]?? '';
      this.Employment_Date=resource["Employment_Date"]?? '';
      this.Address=resource["Address"]?? '';
      this.ClientName=resource["ClientName"]?? '';
      this.Studio_Change_Comment=resource["Studio_Change_Comment"] ?? '';
      this.Default_Deferral_Template_Code=resource["Default_Deferral_Template_Code"]?? '';
      this.Coupled_to_CRM=resource["Coupled_to_CRM"]?? '';
      this.Coupled_to_Dataverse=resource["Coupled_to_Dataverse"]?? '';
    }
  }
  
 export default Resource;
