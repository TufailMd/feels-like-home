mapboxgl.accessToken = token;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: cor,
  zoom: 8,
});

map.on("load", () => {
  map.loadImage(
    "https://res.cloudinary.com/doyqqc08g/image/upload/v1754957876/apnahome_DEV/zv6dcmksf8t2bhqwvs21.png",
    (error, image) => {
      if (error) throw error;
      if (!image) return console.error("Image failed to load");

      map.addImage("cat", image);

      map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: cor },
            },
          ],
        },
      });

      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point",
        layout: {
          "icon-image": "cat",
          "icon-size": 0.08, // bigger so it's visible
        },
      });

      // Show popup on click
      map.on("click", "points", (e) => {
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML("<p>Exact location provided after booking</p>")
          .addTo(map);
      });
    },
  );
});

// D:\Web_Dev\backends\airbnb-clone frontend\public\map.js