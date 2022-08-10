import dynamoDBClient from "src/model";
import RecordsService from "./records.service";

const recordsService = new RecordsService(dynamoDBClient());
export default recordsService;
