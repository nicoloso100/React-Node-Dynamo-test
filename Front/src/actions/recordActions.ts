import { RecordsURls } from "src/utils/constants";
import { HttpClient } from "./HttpClient";

export const GetRecords = async () => {
  const request = await HttpClient.Get<IRecord[]>(RecordsURls.getAllRecords);
  if (request.okay && request.data) {
    return request.data;
  } else {
    throw Error(request.message);
  }
};

export const CreateRecord = async (newRecord: ICreateRecord) => {
  const request = await HttpClient.Post<IRecord>(RecordsURls.createRecord, newRecord);
  console.log(request);
  if (request.okay && request.data) {
    return request.data;
  } else {
    throw Error(request.message);
  }
};

export const UpdateRecord = async (business_id: string, updatedRecord: ICreateRecord) => {
  const request = await HttpClient.Put<IRecord>(`${RecordsURls.updateRecord}/${business_id}`, updatedRecord);
  if (request.okay && request.data) {
    return request.message;
  } else {
    throw Error(request.message);
  }
};

export const DeleteRecord = async (business_id: string) => {
  const request = await HttpClient.Delete<string>(`${RecordsURls.deleteRecord}/${business_id}`);
  if (request.okay && request.data) {
    return request.message;
  } else {
    throw Error(request.message);
  }
};
