import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [websiteUrl, setWebsiteUrl] = useState(
    "https://www.sueddeutsche.de/kultur/comics-peanuts-dilbert-1.4759054"
  );
  const [images, setImages] = useState([
    "https://media-cdn.sueddeutsche.de/image/sz.1.4761829"
  ]);

  const onShow = async () => {
    let url = `http://localhost:9000/getimage?url=${websiteUrl}`;
    try {
      const response = await fetch(url, {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <p>
        Show comics from <a href="www.sueddeutsche.de">Südddeutsche Zeitung</a>
      </p>

      <div className="url-input">
        <input
          className="url"
          value={websiteUrl}
          onChange={event => setWebsiteUrl(event.target.value)}
        />
        <button className="url-show" onClick={onShow}>
          Show
        </button>
      </div>
      {images.map((image, idx) => {
        return <img src={image} />;
      })}
    </div>
  );
};

export default App;
