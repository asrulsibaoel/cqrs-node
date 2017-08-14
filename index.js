const restify = require('restify');
const clc = require('cli-color');
import {EventStore, Container} from 'node-cqrs';
import MongoEventStorage from 'node-cqrs-mongo';
import database from 'config/database';

const container = new Container();

const server = restify.createServer({
    name: 'CQRS Node'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(CookieParser.parse);

restify.CORS.ALLOW_HEADERS.push('content-type');
restify.CORS.ALLOW_HEADERS.push('access-key');
server.pre(restify.CORS({'origins': ['*']}));

container.registerInstance({
    connectionString: 'mongodb://' + database.dbConfig.host + ':' + database.dbConfig.port + '/' + database.dbConfig.dbName
});
container.register(MongoEventStorage, 'storage');
container.register(EventStore, 'eventStore');


require('./src/http/Router');
const port = (process.env.PORT) ? process.env.PORT : 8030;
server.listen(port, () => {
    console.log("---[============]---\n" + clc.bgYellowBright(server.name + ' Listening at port: ' + port) + "\n---[============]---");
});