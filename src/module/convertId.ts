import { ObjectId } from "mongodb";

export const convertId = (objectId:ObjectId):string => {
  return objectId.toString();
}