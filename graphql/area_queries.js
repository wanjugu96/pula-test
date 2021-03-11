import gql from "graphql-tag";

const ALL_AREAS = gql`
  query MyQuery {
    areas {
      id
      average_rainfall
      average_temperature
      average_historical_yield
      prior_yield
      zone
    }
  }
`;

module.exports = {
  ALL_AREAS,
};
