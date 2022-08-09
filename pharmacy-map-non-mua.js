mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWFpbmdyYW0iLCJhIjoiY2t3d2d6MGQ0MDNqbTJwbGM0NndvN3hxayJ9.99_9XH0Yyi4ejYRE19Tgjw';
var map2 = new mapboxgl.Map({
  container: "pharmacy-map-non-mua",
  style: 'mapbox://styles/juliaingram/cl6ld6je0001016pkr61q3b1m',
  zoom: 3.5,
  maxZoom: 13,
  minZoom: 5.75,
  center: [-75.377,42.873],
  projection: 'albers'
});

 map2.on("load", function () {
  map2.addLayer(
    {
      id: "non-mua",
      type: "fill",
      source: {
        type: "geojson",
        data: "mua_false_to_map.geojson"
      },
      paint: {
        "fill-opacity": 0.75,
        "fill-color": ["interpolate",
        ["linear"],
        ["get", "pct_change"],
        -100,
        "#532000", 
        -50,
        '#bf7d33',
        -25,
        '#f7b166',
        0,
        '#f5f5f5',
        25,
        '#7ccec3',
        50,
        '#1e675f',
        100, 
        '#003831',
        ],
      }
    },
  );
  map2.addLayer(
    {
      id: "no-pharmacies",
      type: "fill",
      source: {
        type: "geojson",
        data: "no_pharmacies.geojson"
      },
      paint: {
        "fill-opacity": 0.5,
        "fill-color": "lightgray"
      }
    },
    "non-mua"
  )

map2.on("mouseenter", "non-mua", function () {
map2.getCanvas().style.cursor = "pointer";
});

map2.on("mouseleave", "non-mua", function () {
map2.getCanvas().style.cursor = "";
});

map2.on("mouseenter", "no-pharmacies", function () {
map2.getCanvas().style.cursor = "pointer";
});

map2.on("mouseleave", "no-pharmacies", function () {
map2.getCanvas().style.cursor = "";
});

map2.on("click", "non-mua", function (e) {
  var pharmacies22 = e.features[0].properties.num_pharmacies_2022;
  var pharmacies17 = e.features[0].properties.num_pharmacies_2017;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
        "<p>" 
        +
        pharmacies22
        + 
        ' pharmacies in 2022'
        +
        "<p>"
        +
        pharmacies17
        +
        ' pharmacies in 2017'
    )
    .addTo(map2);
  });


    map2.on("click", "no-pharmacies", function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            "<p>No pharmacies in either year" 
        )
        .addTo(map2);
      });
});



