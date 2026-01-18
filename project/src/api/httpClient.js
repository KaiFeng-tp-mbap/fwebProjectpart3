const BASE_URL = "http://localhost:5050";

async function request(method, url, data = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(BASE_URL + url, options);

  // simulate short wait
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!response.ok) {
    // try parsing error body, else fallback
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP Error ${response.status}`);
  }

  return response.json().catch(() => ({})); //Handle empty JSON
}

export const http = {
  get: (url) => request("GET", url),
  post: (url, data) => request("POST", url, data),
  put: (url, data) => request("PUT", url, data),
  delete: (url) => request("DELETE", url),
};
