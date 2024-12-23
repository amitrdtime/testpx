class Customer {
    constructor(customer = {}) {  
      this.OdataEtag = customer["@odata.etag"]??customer.odataEtag;
      this.Id = customer.id ?? '';
      this.Number = customer.number ?? '';
      this.DisplayName = customer.displayName ?? '';
      this.Type = customer.type ?? '';
      this.AddressLine1 = customer.addressLine1 ?? '';
      this.AddressLine2 = customer.addressLine2 ?? '';
      this.City = customer.city ?? '';
      this.State = customer.state ?? '';
      this.Country = customer.country ?? '';
      this.PostalCode = customer.postalCode ?? '';
      this.PhoneNumber = customer.phoneNumber ?? '';
      this.Email = customer.email ?? '';
      this.SalespersonCode = customer.salespersonCode ?? '';
      this.Website = customer.website ?? '';
    }
  }
  
 export default Customer;