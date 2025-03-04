test("GET to api/v1/status should return 200", async () => {
  const respose = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await respose.json();
  console.log(responseBody);
  expect(respose.status).toBe(200);
});
