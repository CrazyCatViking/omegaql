import { Collection, Db } from "mongodb";
import { getConnection } from "../src/mongoClient";

export interface IDocumentInput {
  document: Record<string, unknown>,
  documentId: string,
};

export default class MongoDbSource {
  db: Db;
  collectionId: string;

  constructor(collectionId: string) {
    this.db = getConnection();
    this.collectionId = collectionId;
  }

  private async getCollection() {
    if (!this.hasCollection(await this.db.collections(), this.collectionId)) {
      this.db.createCollection(this.collectionId);
    }

    return this.db.collection(this.collectionId);
  }

  protected async deleteCollection() {
    if (!this.hasCollection(await this.db.collections(), this.collectionId)) return; // Throw some kind of error to forward
    return await this.db.dropCollection(this.collectionId);
  }

  protected hasCollection(collections: Collection[], collectionId: string) {
    return !!collections.find((collection: Collection) => collection.collectionName === collectionId);
  }

  protected async getDocument(documentId: string) {
    const collection = await this.getCollection();
    const query = { id: documentId };

    const document = await collection.findOne(query);

    return document;
  }

  protected async insertDocument({ document, documentId }: IDocumentInput) {
    const collection = await this.getCollection();
    const documentInput = {
      ...document,
      id: documentId,
    }

    return await collection.insertOne(documentInput);
  }

  protected async updateDocument({ document, documentId }: IDocumentInput) {
    const collection = await this.getCollection();
    const documentInput = {
      ...document,
      id: documentId,
    }
    const query = { query: { id: documentId } };

    return await collection.updateOne(query, {$set: { document: documentInput } });
  }

  protected async deleteDocument(documentId: string) {
    const collection = await this.getCollection();
    const query = { query: {id: documentId} };

    return await collection.deleteOne(query);
  }
}