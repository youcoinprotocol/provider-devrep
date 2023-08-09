export const callAPI = async (
  url: string,
  method?: string,
  jwt?: string,
  body?: any
) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: method ?? "GET",
    headers: !!jwt
      ? {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        },
    body: method === "GET" ? null : JSON.stringify(body ?? {}),
  });
  const data = await res.json();
  return data;
};

export const callInternalAPI = async (
  url: string,
  method?: string,
  jwt?: string,
  body?: any
) => {
  const res = await fetch(`${window.location.origin}${url}`, {
    method: method ?? "GET",
    headers: !!jwt
      ? {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        },
    body: method === "GET" ? null : JSON.stringify(body ?? {}),
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
