export const httpRequest: any =
  typeof fetch !== "undefined" ? fetch : fetchFallback;

function fetchFallback(
  url: string,
  { headers, method, body }: any = {}
): Promise<any> {
  const isNode =
    !process.env.NOT_NODE && typeof module !== "undefined" && module.exports;

  if (!isNode) {
    throw new Error("No NodeJs nor fetch support was found.");
  }

  let _internalData = "";
  let _options = {
    headers: { ...headers },
    method
  };
  const _isHttps = url.startsWith("https:");

  return new Promise((resolve, reject) => {
    const protocol = _isHttps ? require("https") : require("http");

    const req = protocol
      .request(url, _options, (res: any) => {
        res.on("data", (chunk: any) => (_internalData += chunk));
        res.on("end", () =>
          resolve({
            json: () => {
              return JSON.parse(_internalData);
            }
          })
        );
      })
      .on("error", (error: any) => reject(error));

    if (body) {
      req.write(body);
    }

    req.end();
  });
}
