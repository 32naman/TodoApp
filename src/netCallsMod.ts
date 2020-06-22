var netCalls = (function () {
  async function getJSON(
    url: string,
    listNum: number,
    callback: (err: number | null, data: object) => void,
    id_token: string | null
  ) {
    // const id_token = localStorage.getItem("token");
    console.log(url);
    console.log(id_token);

    let postMessage = "id_token=" + id_token + "&listNum=" + listNum;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: postMessage,
    });
    let result = await response.json();
    if (response.status === 200) {
      callback(null, result);
    } else {
      callback(response.status, result);
    }
  }

  async function putJSON(
    url: string,
    listNum: number,
    todos: object[],
    id_token: string | null
  ) {
    // const id_token = localStorage.getItem("token");

    let postJSON = {
      token: id_token,
      listNum: listNum,
      json: JSON.stringify(todos),
    };
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(postJSON),
    });
  }

  async function verifyToken(url: string, id_token: string | null) {
    // const id_token = localStorage.getItem("token");
    console.log(id_token);

    let postMessage = "id_token=" + id_token;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: postMessage,
    });
    let result = await response.text();
    console.log("Signed in as: " + result);
  }

  async function generateLink(
    url: string,
    listNum: number,
    id_token: string | null
  ) {
    // const id_token = localStorage.getItem("token");

    let postMessage = "id_token=" + id_token + "&listNum=" + listNum;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: postMessage,
    });
    let result = await response.text();
    // linkAdd.innerHTML = `<a href="${result}" target="_blank">${result}</a>`;
    return result;
  }

  async function generateSSCode(url: string) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: undefined,
    });
    let result = await response.text();
    return result;
  }

  return {
    getJSON: getJSON,
    putJSON: putJSON,
    verifyToken: verifyToken,
    generateLink: generateLink,
    generateSSCode: generateSSCode,
  };
})();

export default netCalls;
