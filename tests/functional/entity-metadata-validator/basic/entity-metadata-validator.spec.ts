import "reflect-metadata";
import {Connection} from "../../../../src";
import {ConnectionMetadataBuilder} from "../../../../src/connection/ConnectionMetadataBuilder";
import {EntityMetadataValidator} from "../../../../src/metadata-builder/EntityMetadataValidator";

describe("entity-metadata-validator", () => {

    test("should throw error if relation count decorator used with ManyToOne or OneToOne relations", () => {
        const connection = new Connection({ // dummy connection options, connection won't be established anyway
            type: "mysql",
            host: "localhost",
            username: "test",
            password: "test",
            database: "test",
            entities: [__dirname + "/entity/*{.js,.ts}"]
        });
        const connectionMetadataBuilder = new ConnectionMetadataBuilder(connection);
        const entityMetadatas = connectionMetadataBuilder.buildEntityMetadatas([__dirname + "/entity/*{.js,.ts}"]);
        const entityMetadataValidator = new EntityMetadataValidator();
        expect(() => entityMetadataValidator.validateMany(entityMetadatas, connection.driver)).toThrow(Error);
    });

});