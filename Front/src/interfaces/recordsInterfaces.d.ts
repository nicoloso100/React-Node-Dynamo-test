declare interface IRecord extends ICreateRecord {
  business_id: string;
}

declare interface ICreateRecord {
  name: string;
  address: string;
  nit: string;
  phone_number: string;
}
