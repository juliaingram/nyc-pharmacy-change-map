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
      id: "hpsa-outline",
      type: "line",
      source: {
        type: "geojson",
        data: "nyc-hpsa.geojson"
      },
      paint: {
        "line-color": "darkgray",
        "line-width": 1.5,
      }
    }
  );
  map.addLayer(
    {
      id: "hpsa",
      type: "fill",
      source: {
        type: "geojson",
        data: "nyc-hpsa.geojson"
      },
      paint: {
        "fill-opacity": 0.6,
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
      id: "non-hpsa",
      type: "fill",
      source: {
        type: "geojson",
        data: "nyc-non-hpsa.geojson"
      },
      paint: {
        "fill-opacity": 0.6,
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
    "hpsa"
  );
  

map.on("mouseleave", "hpsa", function () {
map.getCanvas().style.cursor = "";
});

map.on("mouseleave", "non-hpsa", function () {
map.getCanvas().style.cursor = "";
});

map.on("mouseenter", "hpsa", function () {
  map.getCanvas().style.cursor = "pointer";
  });
  
map.on("mouseenter", "non-hpsa", function () {
  map.getCanvas().style.cursor = "pointer";
  });

map.on("click", "hpsa", function (e) {
  var pharmacies22 = e.features[0].properties.num_pharmacies_2022;
  var pharmacies17 = e.features[0].properties.num_pharmacies_2017;
  var countyName = e.features[0].properties.county_name;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<p>Among areas like this one where vulnerable populations <span style='font-weight:bold;'>face a physician shortage </span>in "
      +
      "<span style='font-weight:bold;'>" 
      +
      countyName
      +
      "</span>, there were " 
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

map.on("click", "non-hpsa", function (e) {
  var pharmacies22 = e.features[0].properties.num_pharmacies_2022;
  var pharmacies17 = e.features[0].properties.num_pharmacies_2017;
  var countyName = e.features[0].properties.county_name;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<p>Among areas like this one <span style='font-weight:bold;'>not facing a physician shortage </span>in "
      +
      "<span style='font-weight:bold;'>" 
      +
      countyName
      +
      "</span>, there were " 
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



