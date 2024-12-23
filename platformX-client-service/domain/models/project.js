class Project {
    constructor(project = {}) { 
      this.ClientNumber = project.clientNumber ?? '';
      this.ProjectNumber = project.projectNumber ?? '';
      this.SowNumber = project.sowNumber ?? '';
      this.ProjectTaskNo = project.projectTaskNo ?? '';
      this.Description = project.description ?? '';
      this.ProjectTaskType = project.projectTaskType ?? '';
      this.Totaling = project.totaling ?? '';
      this.NewPage = project.newPage ?? '';
      this.BlankLinesNo = project.blankLinesNo ?? '';
      this.ProjectPostingGroup = project.projectPostingGroup ?? '';
      this.WipMethod = project.wipMethod ?? '';
      this.LocationCode = project.locationCode ?? '';
      this.BinCode = project.binCode ?? '';
    }
  }
  
 export default Project;