var netCalls = (function () {
  async function getJSON(
    url: string,
    callback: (err: number | null, data: object) => void,
    hash: string | null,
    socket: WebSocket
  ) {
    let postJSON = { hash: hash };
    socket.onopen = function () {
      socket.send(JSON.stringify(postJSON));
    };
  }

  async function putJSON(url: string, todos: object[], hash: string | null) {
    let postJSON = { hash: hash, json: JSON.stringify(todos) };
    console.log(todos);
    console.log(postJSON);
    // socket.send(JSON.stringify(postJSON));

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(postJSON),
    });
  }

  return {
    getJSON: getJSON,
    putJSON: putJSON,
  };
})();

export default netCalls;
