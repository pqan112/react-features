export const baseUrl = "http://localhost:5000/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postRequest = async (url: string, body: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.json();

  if (!res.ok) {
    let message = "";
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, message };
  }

  return data;
};
