import React, { useEffect } from "react";
import "../css/MapContainer.css";

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  useEffect(() => {
    const COORDS = "coords";

    const handleGeoSuccess = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const coordsObj = {
        latitude,
        longitude,
      };

      localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    };

    const handleGeoError = () => {
      alert("위치 정보를 불러올 수 없습니다");
    };

    navigator.geolocation.watchPosition(handleGeoSuccess, handleGeoError);

    //
    //
    //

    const parseCoords = JSON.parse(localStorage.getItem(COORDS));

    let latitude, longitude, options;

    if (parseCoords) {
      latitude = parseCoords.latitude;
      longitude = parseCoords.longitude;
      options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 2,
      };
    } else {
      latitude = 33.450701;
      longitude = 126.570667;
      options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 2,
      };
    }

    const container = document.getElementById("myMap");

    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:2vw;font-size:4vw;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div id="MapContainer">
      <div
        id="myMap"
        style={{
          width: "90vw",
          height: "70vh",
        }}
      ></div>
    </div>
  );
};

export default MapContainer;
