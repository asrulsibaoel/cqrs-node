import {EventStore, Container} from 'node-cqrs';
import MongoEventStorage from 'node-cqrs-mongo';
import database from 'config/database'

const container = new Container();

container.registerInstance({
    connectionString: 'mongodb://' + database.dbConfig.host + ':' + database.dbConfig.port + '/' + database.dbConfig.dbName
});
container.register(MongoEventStorage, 'storage');
container.register(EventStore, 'eventStore');

