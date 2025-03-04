export default async function status(_, response) {
  return response.status(200).json({ message: "salve pae" });
}
