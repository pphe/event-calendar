import gql from 'graphql-tag';

export const GET_EVENTS = gql`
    query {
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
    // options to include with the query, i.e. props passed
    // from the parent to the component making the query
    options: ({ id }) => ({
        variables: { id }
    }),

    // has the query results from Apollo (i.e. this.props.data._)
    // and allows you to specify ways for the child to receive 
    // the props from the query. e.g. below: child receives
    // this.props.event vs this.props.data.getEvent
    // props: ({ data: { getEvent } }) => ({
    //     event: getEvent
    // }),
};

// to do: figure out post query structure
// mutation postEvent($input: EventInput!)
export const POST_EVENT = gql`
    mutation postEvent($newEvent: EventInput!) {
        postEvent(input: $newEvent) {
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

export const POST_EVENT_CONFIG = {
    // options: ({ id }) => ({
    //     variables: { id: id }
    // }),
};
