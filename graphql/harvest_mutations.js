import gql from "graphql-tag";

const ADD_HARVESTS = gql`
  mutation MyMutation($objects: [harvests_insert_input!]!) {
    insert_harvests(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

module.exports = {
  ADD_HARVESTS,
};
