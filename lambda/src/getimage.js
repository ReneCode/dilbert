const fetch = require("node-fetch");
const HTMLParser = require("node-html-parser");
const axios = require("axios");

const getImage = url => {
  // const url =
  //   "https://www.sueddeutsche.de/kultur/comics-peanuts-dilbert-1.4759054";

  return axios.get(url).then(({ data }) => {
    const html = data;
    const root = HTMLParser.parse(html);
    const img = root.querySelector(".content .image img");
    const src = img.attributes["data-src"];
    const regexp = /(http.*)\/(.*)/;
    const groups = src.match(regexp);
    const imageUrl = groups[1];
    return imageUrl;
  });
};

exports.handler = function(event, context, callback) {
  const url = event.queryStringParameters.url;
  if (!url) {
    callback(null, { statusCode: 412, body: "url parameter missing" });
    return;
  }

  console.log(":", context);
  getImage(url)
    .then(img => {
      const response = {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ img: img })
      };
      callback(null, response);
      return;
    })
    .catch(err => {
      console.error(err);
      callback(err);
    });
};

// getImage();
