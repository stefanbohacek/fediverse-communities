import fs from "node:fs";
import path from "node:path";

const COMMUNITIES_DIR = path.join(import.meta.dirname, "communities");
const CACHE_PATH = path.join(
  import.meta.dirname,
  "..",
  "_cache",
  "communities.json",
);
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

const loadConfig = () => {
  const files = fs
    .readdirSync(COMMUNITIES_DIR)
    .filter((f) => f.endsWith(".json"));
  const communities = files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(COMMUNITIES_DIR, f), "utf8")),
  );
  return communities.filter((c) => c.visible);
};

const readCache = () => {
  if (!fs.existsSync(CACHE_PATH)) return null;
  return JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
};

const isCacheValid = (cache) => {
  const age = Date.now() - new Date(cache.fetched_at).getTime();
  return age < CACHE_MAX_AGE_MS;
};

const writeCache = (fetched_at, api_data) => {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(
    CACHE_PATH,
    JSON.stringify({ fetched_at, api_data }, null, 2),
  );
};

const fetchServerInfo = async (domain) => {
  const data = await fetch(
    `https://fediverse-info.stefanbohacek.com/node-info?domain=${domain}&full=true`,
  ).then((r) => r.json());
  return {
    active_month: data.nodeInfo.usage.users.activeMonth,
    software: data.nodeInfo.software.name,
    description: data.nodeInfo.metadata.nodeDescription,
  };
};

const addServerInfo = (config, apiData) =>
  config.map((community) => ({ ...community, ...apiData[community.domain] }));

export default async () => {
  const config = loadConfig();
  const cache = readCache();

  if (cache && isCacheValid(cache)) {
    return {
      items: addServerInfo(config, cache.api_data),
      fetched_at: cache.fetched_at,
    };
  }

  try {
    const entries = await Promise.all(
      config.map(async ({ domain }) => [domain, await fetchServerInfo(domain)]),
    );
    const apiData = Object.fromEntries(entries);
    const fetched_at = new Date().toISOString();

    writeCache(fetched_at, apiData);
    return { items: addServerInfo(config, apiData), fetched_at };
  } catch (err) {
    console.error("communities error:", err.message);
    if (cache) {
      return {
        items: addServerInfo(config, cache.api_data),
        fetched_at: cache.fetched_at,
      };
    }
    return { items: config, fetched_at: new Date().toISOString() };
  }
};
