import gql from "graphql-tag";

const ADD_FARMERS = gql`
  mutation MyMutation($objects: [farmers_insert_input!]!) {
    insert_farmers(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

module.exports = {
  ADD_FARMERS,
};
