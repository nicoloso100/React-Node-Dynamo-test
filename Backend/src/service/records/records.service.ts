import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Record from "src/model/record";

export default class RecordsService {
  private Tablename: string = "RecordsTable";

  constructor(private docClient: DocumentClient) {}

  async getAllRecords(): Promise<Record[]> {
    const records = await this.docClient
      .scan({
        TableName: this.Tablename,
      })
      .promise();
    return records.Items as Record[];
  }

  async createRecord(record: Record): Promise<Record> {
    await this.docClient
      .put({
        TableName: this.Tablename,
        Item: record,
      })
      .promise();
    return record as Record;
  }

  async updateRecord(id: string, record: Partial<Record>): Promise<Record> {
    const updated = await this.docClient
      .update({
        TableName: this.Tablename,
        Key: { business_id: id },
        UpdateExpression:
          "set #name = :name, #address = :address, #nit = :nit, #phone_number = :phone_number",
        ConditionExpression: "attribute_exists(business_id)",
        ExpressionAttributeNames: {
          "#name": "name",
          "#address": "address",
          "#nit": "nit",
          "#phone_number": "phone_number",
        },
        ExpressionAttributeValues: {
          ":name": record.name,
          ":address": record.address,
          ":nit": record.nit,
          ":phone_number": record.phone_number,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return updated.Attributes as Record;
  }

  async deleteRecord(id: string): Promise<void> {
    const record = await this.docClient
      .delete({
        TableName: this.Tablename,
        Key: {
          business_id: id,
        },
        ReturnValues: "ALL_OLD",
      })
      .promise();
    if (!record.Attributes) {
      throw "Cannot delete item that does not exist";
    }
  }
}
