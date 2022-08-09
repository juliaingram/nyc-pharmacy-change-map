mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWFpbmdyYW0iLCJhIjoiY2t3d2d6MGQ0MDNqbTJwbGM0NndvN3hxayJ9.99_9XH0Yyi4ejYRE19Tgjw';
var map = new mapboxgl.Map({
  container: "pharmacy-map",
  style: 'mapbox://styles/juliaingram/cl6ld6je0001016pkr61q3b1m',
  zoom: 9.3,
  maxZoom: 12,
  minZoom: 9,
  center: [-73.977,40.699],
  projection: 'albers'
});

 map.on("load", function () {
  map.addLayer(
    {
      id: "mua",
      type: "fill",
      source: {
        type: "geojson",
        data: "nyc-mua.geojson"
      },
      paint: {
        "fill-opacity": 0.75,
        "fill-color": ["interpolate",
        ["linear"],
        ["get", "pct_change"],
        -20,
        "#884d13", 
        -10,
        '#bf7d33',
        -5,
        '#f7b166',
        0,
        '#f5f5f5',
        5,
        '#7ccec3',
        10,
        '#469a90',
        20, 
        '#1e675f',
        ],
      }
    },
  );
  map.addLayer(
    {
      id: "non-mua",
      type: "fill",
      source: {
        type: "geojson",
        data: "nyc-non-mua.geojson"
      },
      paint: {
        "fill-opacity": 0.75,
        "fill-color": ["interpolate",
        ["linear"],
        ["get", "pct_change"],
        -20,
        "#884d13", 
        -10,
        '#bf7d33',
        -5,
        '#f7b166',
        0,
        '#f5f5f5',
        5,
        '#7ccec3',
        10,
        '#469a90',
        20, 
        '#1e675f',
        ],
      }
    },
    "mua"
  );
  

map.on("mouseleave", "mua", function () {
map.getCanvas().style.cursor = "";
});

map.on("mouseleave", "non-mua", function () {
map.getCanvas().style.cursor = "";
});

map.on("mouseenter", "mua", function () {
  map.getCanvas().style.cursor = "pointer";
  });
  
map.on("mouseenter", "non-mua", function () {
  map.getCanvas().style.cursor = "pointer";
  });

map.on("click", "mua", function (e) {
  var pharmacies22 = e.features[0].properties.num_pharmacies_2022;
  var pharmacies17 = e.features[0].properties.num_pharmacies_2017;
  var countyName = e.features[0].properties.county_name;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<p>Among <span style='font-weight:bold;'>medically underserved areas </span>in "
      +
      "<span style='font-weight:bold;'>" 
      +
      countyName
      +
      "</span> like this one, there were " 
      +
      "<span style='font-weight:bold;'>"
      +
      pharmacies22
      + 
      '</span> pharmacies in 2022 and '
      +
      "<span style='font-weight:bold;'>"
      +
      pharmacies17
      +
      '</span> pharmacies in 2017'
    )
    .addTo(map);
  });

map.on("click", "non-mua", function (e) {
  var pharmacies22 = e.features[0].properties.num_pharmacies_2022;
  var pharmacies17 = e.features[0].properties.num_pharmacies_2017;
  var countyName = e.features[0].properties.county_name;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<p>Among areas <span style='font-weight:bold;'>not medically underserved </span>in "
      +
      "<span style='font-weight:bold;'>" 
      +
      countyName
      +
      "</span> like this one, there were " 
      +
      "<span style='font-weight:bold;'>"
      +
      pharmacies22
      + 
      '</span> pharmacies in 2022 and '
      +
      "<span style='font-weight:bold;'>"
      +
      pharmacies17
      +
      '</span> pharmacies in 2017'
    )
    .addTo(map);
  });

});



