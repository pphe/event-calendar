const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = 4000;

const events = [
    {
        id: 1,
        title: 'Pajama Party',
        host: 'Frank Ocean',
        location: '1234 Bologna Dr. Venice Beach, CA 53910',
        description: 'Onesies twosies threesies foursies',
        start: new Date(2018, 10, 8, 20, 30).toString(),
        end: new Date(2018, 10, 9, 8, 0).toString(),
        allDay: false
    },
    {
        id: 2,
        title: 'Jupiter Interview',
        host: 'Rich & Helen',
        location: 'Teleconference - Google/Skype',
        description: 'Meet & greet and some nerve-racking coding',
        start: new Date(2018, 10, 5, 14, 30).toString(),
        end: new Date(2018, 10, 5, 16, 30).toString(),
        allDay: false
    },
    {
        id: 3,
        title: 'Dinner with besties',
        host: 'Boiling Point',
        location: '361 Strander Blvd, Tukwila, WA 98188',
        description: 'Rub a dub grub!',
        start: new Date(2018, 10, 30, 17, 30).toString(),
        end: new Date(2018, 10, 30, 19, 0).toString(),
        allDay: false
    },
    {
        id: 4,
        title: 'My Birthday!',
        host: 'Me?',
        location: 'My house!',
        description: 'Potluck! Please feed me...',
        start: new Date(2018, 11, 2, 0, 1).toString(),
        end: new Date(2018, 11, 2, 23, 59).toString(),
        allDay: false
    }
];

const typeDefs = gql`
 type Event {
    id: Int!
    title: String!
    host: String!
    location: String!
    description: String!
    start: String!
    end: String!
    allDay: Boolean
}

  type Query {
    getEvents: [Event]
    getEvent(id: Int!): Event
  }

  type Mutate {
      addEvent: Event
  }
`;

const resolvers = {
    Query: {
        getEvents: () => events,
        getEvent: (root, args, ctx, info) =>
            events.find(event => event.id === args.id)
    },

    Mutate: {
        addEvent: () => { }
    }
};

const app = express();
// app.use(/* express middleware */)
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => console.log(`Listening on port ${port}.`));
