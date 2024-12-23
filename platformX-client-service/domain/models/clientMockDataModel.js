class Resource {
    constructor(data) {
        this.projectNo = data.projectNo || '';
        this.resourceNo = data.resourceNo || '';
        this.name = data.name || '';
        this.type = data.type || 'Resource';
        this.lineType = data.lineType || 'Material';
        this.planningDate = data.planningDate || '';
        this.plannedDeliveryDate = data.plannedDeliveryDate || '';
        this.documentNo = data.documentNo || '';
        this.quantity = data.quantity || 0;
        this.qtyToAssemble = data.qtyToAssemble || 0;
        this.unitCost = data.unitCost || 0;
        this.totalCost = data.totalCost || 0;
        this.unitPrice = data.unitPrice || 0;
        this.lineAmount = data.lineAmount || 0;
        this.qtyToTransferToJournal = data.qtyToTransferToJournal || 0;
        this.invoicedAmount = data.invoicedAmount || 0;
    }
}

class Project {
    constructor(data = {}) {
        if (typeof data !== 'object' || data === null) {
            data = {}; // Fallback to an empty object if the resource is invalid
        }
        this.clientNumber = data.clientNumber || '';
        this.sowNo = data.sowNo || '';
        this.projectNo = data.projectNo || '';
        this.description = data.description || '';
        this.projectTaskType = data.projectTaskType || '';
        this.totaling = data.totaling || '';
        this.newPage = data.newPage || false;
        this.noBlankLines = data.noBlankLines || 0;
        this.projectPostingGroup = data.projectPostingGroup || '';
        this.wipMethod = data.wipMethod || '';
        this.LocationCode = data.LocationCode || '';
        this.BinCode = data.BinCode || '';
        this.Resources = (data.resources || []).map(res => new Resource(res));
    }
}

class SOW {
    constructor(data) {
        this.odataEtag = data.odataEtag || '';
        this.clientNumber = data.clientNumber || '';
        this.sowNo = data.sowNo || '';
        this.description = data.description || '';
        this.project_Manager_ID = data.project_Manager_ID || '';
        this.project_Manager_Name = data.project_Manager_Name || '';
        this.person_Responsible_ID = data.person_Responsible_ID || '';
        this.person_ResponsibleName = data.person_ResponsibleName || '';
        this.job_Type = data.job_Type || '';
        this.status = data.status || '';
        this.lastModifiedDateTime = data.lastModifiedDateTime || '';
        this.Projects = (data.Projects || []).map(proj => new Project(proj));
    }
}

class Client {
    constructor(data = {}) {
        if (typeof data !== 'object' || data === null) {
            data = {}; // Fallback to an empty object if the resource is invalid
        }

        this.id = data.id || '';
        this.number = data.number || '';
        this.displayName = data.displayName || '';
        this.type = data.type || '';
        this.addressLine1 = data.addressLine1 || '';
        this.addressLine2 = data.addressLine2 || '';
        this.city = data.city || '';
        this.state = data.state || '';
        this.country = data.country || '';
        this.postalCode = data.postalCode || '';
        this.phoneNumber = data.phoneNumber || '';
        this.email = data.email || '';
        this.salespersonCode = data.salespersonCode || '';
        this.website = data.website || '';
        this.SOWs = (data.sows || []).map(sow => new SOW(sow));
    }
}

export default { Client, SOW, Project, Resource };
