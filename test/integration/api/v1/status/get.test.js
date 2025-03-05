test("GET to api/v1/status should return 200 and others variables must be defined", async () => {
  const respose = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await respose.json();
  const parsingDate = new Date(responseBody.update_at).toISOString();

  expect(respose.status).toBe(200);
  expect(responseBody.update_at).toBeDefined();
  expect(responseBody.update_at).toEqual(parsingDate);
  expect(responseBody.dependecies.database.version).toBe("16.0");
  expect(responseBody.dependecies.database.opended_connections).toBe(1);
  expect(responseBody.dependecies.database.max_connections).toBeDefined();
});
