import gql from "graphql-tag";

const ADD_AREAS = gql`
  mutation MyMutation($objects: [areas_insert_input!]!) {
    insert_areas(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

module.exports = {
  ADD_AREAS,
};
