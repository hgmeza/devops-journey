import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface IPhotos {
  filename: string;
  url: string;
}

const App = () => {
  const [photos, setPhotos] = useState<IPhotos[]>([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL!;
    const getPhotos = async () => {
      const { data } = await axios.get(`${apiUrl}/get-photos`);
      setPhotos(data.photos || []);
    };

    getPhotos();
  }, []);

  return (
    <div className="App bg-secondary min-vh-100">
      <h1 className="display-4 p-3 mb-5">This was deployed using AWS CDK</h1>
      <Carousel>
        {photos.map(pic => (
          <Carousel.Item
            interval={1500}
            style={{ height: 350 }}
            key={pic.filename}
          >
            <img src={pic.url} alt={pic.filename} className="h-100" />
            <Carousel.Caption>
              <h3 style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                {pic.filename}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default App;
