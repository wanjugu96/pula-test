import { ALL_FARMERS } from "../../../graphql/farmer_queries";
import { ADD_FARMERS } from "../../../graphql/farmer_mutations";
import { dispatchQuery, dispatchMutation } from "../../../lib/apolloRequest";

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const { data, error } = await dispatchQuery(ALL_FARMERS);

        if (await error) {
          throw new Error(error.message);
        }

        return res.status(200).json({ result: "success", payload: await data });
      } catch (e) {
        console.log(e);
        return res.status(400).json({ result: "error", payload: e.message });
      }
      break;

    case "POST":
      try {
        const { data, error } = await dispatchMutation(ADD_FARMERS, {
          objects: body.objects,
        });

        if (await error) {
          throw new Error(error.message);
        }

        return res.status(200).json({ result: "success", payload: await data });
      } catch (e) {
        console.log(e);
        return res.status(400).json({ result: "error", payload: e.message });
      }
      break;
    default:
      return res.json({
        result: "fail",
        payload: "Invalid request method",
      });
  }
};
