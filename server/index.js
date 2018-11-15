const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const port = process.env.PORT || 4000;

const events = [
    {
        id: 1,
        title: 'Pajama Party',
        host: 'Frank Ocean',
        location: '1234 Bologna Dr. Venice Beach, CA 53910',
        description: 'Onesies twosies threesies foursies',
        start: new Date(2018, 10, 8, 20, 30),
        end: new Date(2018, 10, 9, 16).toString(),
        allDay: false
    },
    {
        id: 2,
        title: 'My Birthday!',
        host: 'Me?',
        location: 'My house!',
        description: 'Potluck! Please feed me...',
        start: new Date(2018, 11, 2, 0, 1).toJSON(),
        end: new Date(2018, 11, 2, 23, 59).getTime(),
        allDay: false
    },
    {
        id: 3,
        title: 'Dinner with besties',
        host: 'Boiling Point',
        location: '361 Strander Blvd, Tukwila, WA 98188',
        description: 'Rub a dub grub!',
        start: '2018-12-01T01:30:00.000Z',
        end: '2018-12-01T03:00:00.000Z',
        allDay: false
    },
    {
        id: 4,
        title: 'Jupiter Interview',
        host: 'Rich & Helen',
        location: 'Teleconference - Google/Skype',
        description: 'Meet & greet and some nerve-racking coding',
        start: '2018-11-05T22:30:00.000Z',
        end: '2018-11-06T00:30:00.000Z',
        allDay: false
    }
];

const typeDefs = gql`
    scalar Date

    type Event {
        id: Int!
        title: String!
        host: String
        location: String
        description: String
        start: Date!
        end: Date!
        allDay: Boolean
    }

    input EventInput {
        title: String!
        host: String
        location: String
        description: String
        start: Date!
        end: Date!
        allDay: Boolean
    }
    
    type Query {
        getEvents: [Event]
        getEvent(id: Int!): Event
    }
  
    type Mutation {
        postEvent(input: EventInput!): Event
    }
`;

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) { return value; },
        serialize(value) { return value; },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        }
    }),

    Query: {
        getEvents: () => events,
        getEvent: (obj, args, ctx, info) => events.find(event => event.id === args.id)
    },

    Mutation: {
        postEvent: (obj, args, ctx, info) => {
            args.input.id = events.length + 1;
            if (!args.input.allDay) args.input.allDay = false;
            const theEvent = Object.assign({}, args.input);
            events.push(theEvent);
            return theEvent;
        }
    }
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
// app.use(/* express middleware */)
app.use(express.static(require('path').join(__dirname, '../client/build')));
server.applyMiddleware({ app, path: '/graphql' });
app.listen(port, () => console.log(`Listening on port ${port}.`));
