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
}
