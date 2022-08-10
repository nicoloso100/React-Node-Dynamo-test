const baseUrl = "https://hxinhs0r31.execute-api.us-east-1.amazonaws.com/dev";

export class RecordsURls {
  static getAllRecords = `${baseUrl}/records/get-all-records`;
  static createRecord = `${baseUrl}/records/create-record`;
  static updateRecord = `${baseUrl}/records/update-record`;
  static deleteRecord = `${baseUrl}/records/delete-record`;
}
