class ZipCode {
  constructor(zipcode = {}) {
    this.OdataEtag = zipcode["@odata.etag"];
    this.Code = zipcode.Code ?? undefined;
    this.City = zipcode.City ?? "";
    this.County_Region_Code = zipcode.County_Region_Code ?? "";
    this.County = zipcode.County ?? "";
    this.TimeZone = zipCode.TimeZone ?? "";
  }
}

export default ZipCode;
