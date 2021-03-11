import gql from "graphql-tag";

const ALL_FARMERS = gql`
  query MyQuery {
    farmers {
      id
      name
      area_id
    }
  }
`;

module.exports = {
  ALL_FARMERS,
};
