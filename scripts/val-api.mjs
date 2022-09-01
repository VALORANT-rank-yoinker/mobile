import axios from "axios";
import { writeFileSync } from "node:fs";
import { join } from "path";

const BASE_PATH = "src/assets/val-api";

const BASE_URL = "https://valorant-api.com";
const ROUTES = ["/v1/agents", "/v1/competitivetiers", "/v1/weapons"];

const writeJSONSync = (filepath, data) => {
  try {
    writeFileSync(filepath, JSON.stringify(data));
  } catch (err) {
    console.log(`Error writing ${filepath}`, err);
  }
};

const downloadResponses = async () => {
  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;

    const { data } = await axios(url);

    if (data?.status !== 200) break;

    const filename = `${route.split("/").slice(-1)[0]}.json`;
    writeJSONSync(join(BASE_PATH, filename), data.data);
  }
};

const main = async () => {
  await downloadResponses(BASE_URL, ROUTES);
};
main();
