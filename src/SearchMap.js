// import React, { useEffect } from "react";
// import "./css/SearchMap.css";

// const SearchMap = () => {
//   // const { kakao } = window;

//   const COORDS = "coords";

//   const handleGeoSuccess = (position) => {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     const coordsObj = {
//       latitude,
//       longitude,
//     };

//     localStorage.setItem(COORDS, JSON.stringify(coordsObj));
//   };

//   const handleGeoError = () => {
//     alert("위치 정보를 불러올 수 없습니다");
//   };

//   navigator.geolocation.watchPosition(handleGeoSuccess, handleGeoError);

//   const getMap = () => {
//     const container = document.getElementById("map");

//     const parseCoords = JSON.parse(localStorage.getItem(COORDS));
//     const { latitude, longitude } = parseCoords;

//     // const options = {
//     //   center: new kakao.maps.LatLng(latitude, longitude),
//     //   level: 3,
//     // };
//     // // eslint-disable-next-line no-unused-vars
//     // const map = new kakao.maps.Map(container, options);
//   };

//   useEffect(() => {
//     getMap();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div id="SearchMap">
//       <div id="map"></div>
//     </div>
//   );
// };

// export default SearchMap;
