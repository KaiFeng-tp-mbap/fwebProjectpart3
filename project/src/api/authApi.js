import { http } from "./httpClient";

// DEMO ONLY: "login" by querying users. In real apps, you'd POST to /login and handle JWT/cookies.
export async function login(email, password) {
  const IS_DEMO = true;

  let user, token;

  if (IS_DEMO) {
    // Build URL with query params
    const URL = `/user?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`;

    const matches = await http.get(URL);

    // if user is found
    user = matches?.[0];

    // if user is not found
    if (!user) throw new Error("Invalid credentials");

    // Fake token for demo
    token = `demo-token-${user.id}-${Date.now()}`;
  } else {
    // TODO Actual implementation
  }

  return { user, token };
}

// placeholder function to get my own user details by id
export async function getMe(token) {
  return null;
}
