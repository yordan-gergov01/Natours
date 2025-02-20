export const displayMap = function (locations) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoieW9yZGFuMDEiLCJhIjoiY203MWlucWZnMDU3czJrc2ZzdGhnYXpldCJ9.ClPDKL5bMRLnM6bZizjNlw';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/yordan01/cm71jw4of01az01sd07qy79xc', // style URL
    scrollZoom: false,
    //   center: [-118.113491, 34.111745], // starting position [lng, lat]
    //   zoom: 9, // starting zoom
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
