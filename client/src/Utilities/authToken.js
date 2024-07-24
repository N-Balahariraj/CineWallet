import Cookies from "js-cookie";

export default async function refreshToken() {
  const refreshToken = Cookies.get("REFRESH_TOKEN");

  try {
    const res = await fetch(`${process.env.REACT_APP_GLOBALHOST}/refresh`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "Application/json",
        authorization: `JWT ${refreshToken}`,
      },
    });
    if (!res.ok) throw new Error("Token refresh unsuccessfull");
    const data = await res.json();
    console.log(data.message);
  } catch (error) {
    console.log("err : ", error);
  }
}

setInterval(() => refreshToken(), 13 * 60 * 1000);
