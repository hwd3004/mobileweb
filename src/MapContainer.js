import React, { useEffect } from "react";

const MapContainer = () => {
  const { kakao } = window;

  const getMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    // eslint-disable-next-line no-unused-vars
    const map = new kakao.maps.Map(container, options);
  };

  useEffect(() => {
    getMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="map"></div>;
};

export default MapContainer;
