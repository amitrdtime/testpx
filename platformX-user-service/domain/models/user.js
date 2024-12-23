class User {
  constructor(user = {}) {    
    if (user.empID == null) {
      throw new Error("EmpID is required and cannot be null or undefined.");
    }
    this.empID = user.empID;
    this.firstName = user.firstName ?? '';
    this.middleName = user.middleName ?? '';
    this.lastName = user.lastName ?? '';
    this.phoneNumber = user.phoneNumber ?? '';
    this.personalEmail = user.personalEmail ?? '';
    this.gender = user.gender ?? '';
    this.dob = user.dob ?? '';
    this.bloodGroup = user.bloodGroup ?? '';
    this.nationality = user.nationality ?? '';
    this.currentAddress = user.currentAddress ?? '';
    this.permanentAddress = user.permanentAddress ?? '';
    this.secondaryNumber = user.secondaryNumber ?? '';
    this.userRole = user.userRole ?? '';
    this.designation = user.designation ?? '';
    this.officialEmail = user.officialEmail ?? '';
    this.baseLocation = user.baseLocation ?? '';
    this.reportingManager = user.reportingManager ?? '';
    this.typeOfEmployee = user.typeOfEmployee ?? '';
    this.department = user.department ?? '';
    this.workingType = user.workingType ?? '';
    this.createdBy = user.createdBy ?? '';
    this.createdDate = user.createdDate ?? null;
    this.updatedAt = user.updatedAt ?? null;
    this.modifiedBy = user.modifiedBy ?? '';
  }
}

  export default User;