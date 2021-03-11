import gql from "graphql-tag";

const ALL_HARVESTS = gql`
  query MyQuery {
    harvests {
      id
      farmer_id
      yield
      created_at
    }
  }
`;

module.exports = {
  ALL_HARVESTS,
};
