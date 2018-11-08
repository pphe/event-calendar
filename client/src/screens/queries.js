import gql from 'graphql-tag';

export const GET_EVENTS = gql`
    query getEvents {
        getEvents {
            id
            title
            start
            end
            allDay
        }
    }
`;

export const GET_EVENT = gql`
    query getEvent($id: Int!) {
        getEvent(id: $id) {
            id
            title
            host
            location
            description
            start
            end
            allDay
        }
    }
`;

export const GET_EVENT_CONFIG = {
    // options to include with the query, i.e. props of the
    // graphql HOC component (the one making the call)
    options: (props) => ({
        variables: { id: props.id }
    }),

    // has the query results from Apollo (i.e. this.props.data._)
    // and allows you to specify ways for the child to receive 
    // the props from the query. e.g. below: child receives
    // this.props.event vs this.props.data.getEvent
    // props: ({ data: { getEvent } }) => ({
    //     event: getEvent
    // }),
};

export const POST_EVENT = gql`
    mutation postEvent($eventInput: EventInput!) {
        postEvent(input: $eventInput) {
            title
            host
            location
            description
            start
            end
            allDay
        }
    }
`;

export const POST_EVENT_CONFIG = {
    options: {
        refetchQueries: (mutationResult) => ['getEvents'],

        /*
            ### Updating UI ###
            update option doesn't work but refetchQueries does. 
           
            reason: { data.postEvent } object in update field is
            the eventInput data being sent TO the resolver so it's
            missing the 'id' field, i.e. won't conform to the 
            getEvents [Event] type.
           
            decision: don't generate an 'id' here just to be able to
            insert it into the cache. let that logic stay in the 
            resolver on the server side of things.
        */

        // update: (cache, { data: { postEvent } }) => {
        //     const { getEvents } = cache.readQuery({ query: GET_EVENTS });
        //     const updatedEvents = getEvents.concat([postEvent]);
        //     cache.writeQuery({
        //         query: GET_EVENTS,
        //         data: { getEvents: updatedEvents }
        //     });
        // }
    }
};

// export const POST_EVENT_CONFIG = {
//     options: (props) => ({
//         variables: {
//             input: {
//                 title: props.title,
//                 host: props.host,
//                 location: props.location,
//                 description: props.description,
//                 start: props.start,
//                 end: props.end,
//             }
//         }
//     }),
// };
