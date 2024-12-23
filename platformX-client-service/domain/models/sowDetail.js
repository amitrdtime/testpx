class SowDetail {
    constructor(sows = {}) {
      if (typeof sows !== 'object' || sows === null) {      
        sows = {}; // Fallback to an empty object if the resource is invalid
      }  
      this.odataEtag = sows["odataEtag"]??'';
      this.sowNo =  sows["sowNo"] ?? '';
      this.description = sows["description"] ?? '';
      this.customer_No= sows["customer_No"] ?? '';
      this.customer_Name =  sows["customer_Name"] ?? '';
      //Person_Responsible ID like Employee ID
      this.person_Responsible_ID =  sows["person_Responsible_ID"] ?? '';
      //Employee Name
      this.person_ResponsibleName=  sows["person_ResponsibleName"] ?? '';
      //Project manager ID like Employee ID
      this.project_Manager_ID = sows["project_Manager_ID"] ?? '';
      this.project_Manager_Name = sows["project_Manager_Name"] ?? '';
      //Fixed bid ,Time and meterial & Internal
      this.job_Type =  sows["job_Type"] ?? '';
      this.status =  sows["status"] ?? '';
      this.lastModifiedDateTime = sows["lastModifiedDateTime"] ?? '';
    }
  }
  
 export default SowDetail;