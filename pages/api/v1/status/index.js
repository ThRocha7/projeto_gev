import database from "infra/database";
import { version } from "react";

export default async function status(_, response) {
  const update_at = new Date().toISOString();
  const versionResult = await database.query("SHOW SERVER_VERSION;");
  const versionValue = versionResult.rows[0].server_version;

  const databaseName = process.env.POSTGRES_DB;
  const opendedResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const opendedValues = opendedResult.rows[0].count;

  const maxConnResult = await database.query("SHOW max_connections;");
  const maxConnValues = maxConnResult.rows[0].max_connections;
  return response.status(200).json({
    update_at: update_at,
    dependecies: {
      database: {
        version: versionValue,
        opended_connections: opendedValues,
        max_connections: maxConnValues,
      },
    },
  });
}
