// app/routes/app.api.jsx
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  await authenticate.admin(request);
  return new Response(
    JSON.stringify({ message: "hello this is first app created in shopify" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
