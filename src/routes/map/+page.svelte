<script lang="ts">
  import { onMount } from "svelte";
  import L, { icon } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import "leaflet.control.layers.tree";
  import "leaflet.control.layers.tree/L.Control.Layers.Tree.css";
  import type { PageData } from ".svelte-kit/types/src/routes/$types";


  export let data: PageData;
  const meters = data.GPS as Object;


  let map: L.Map | L.LayerGroup<any>;

  onMount(async () => {
    map = L.map("map", {
      zoomControl: true,
      maxZoom: 28,
      minZoom: 1,
    });
    console.log(map);

    map.setView([34.330395361608595, -85.2480697631836], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    // Open Street Map Creation //
    map.createPane("pane_OSM");
    var layer_OSM = L.tileLayer(
      "http://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        pane: "pane_OSM",
        opacity: 1.0,
        attribution:
          '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
        minZoom: 1,
        maxZoom: 28,
        minNativeZoom: 0,
        maxNativeZoom: 19,
      }
    );
    // layer_OSM;
    // map.addLayer(layer_OSM);

    // Dark Open Street Map Creation //
    map.createPane("pane_OSM_dark");
    var layer_OSM_dark = L.tileLayer(
      "http://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        className: "map-tiles",
        pane: "pane_OSM_dark",
        opacity: 1.0,
        minZoom: 1,
        maxZoom: 28,
        minNativeZoom: 0,
        maxNativeZoom: 19,
      }
    );

    // Google Satellite Base Map Creation //
    map.createPane("pane_GoogleSat");
    var layer_GoogleSat = L.tileLayer(
      "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        pane: "pane_GoogleSat",
        opacity: 1.0,
        attribution: "",
        minZoom: 1,
        maxZoom: 28,
        minNativeZoom: 0,
        maxNativeZoom: 19,
      }
    );
    layer_GoogleSat;



    var baseTree = {
      label: "Base Maps",
      children: [
        { label: "OpenStreetMap", layer: layer_OSM },
        { label: "Google Satellite", layer: layer_GoogleSat },
        {
          label: "OpenStreetMap Dark Mode",
          layer: layer_OSM_dark,
        },
        /* ... */
      ],
    };

    var options = {
      collapseAll: "",
      collapsed: false,
    };

    function addMarkersToMap(map: L.Map, meters) {
      const routeLayers: { [key: string]: L.LayerGroup } = {};

      meters.forEach((meter: { Route: any; X: any; Y: any; }) => {
        const { Route, X, Y } = meter;

        const markerIcon = L.icon({
          iconUrl: `src/Data/markers/rt${Route}.png`,
          iconSize: [25, 25], // Adjust the size according to your marker images
        });

        const marker = L.marker([Y, X], { icon: markerIcon });

        if (!routeLayers[Route]) {
          routeLayers[Route] = L.layerGroup()
        }
        marker.addTo(routeLayers[Route]);
      });

      console.log(routeLayers)

      var mapRoutes: object = {
        label: "Meters",
        children: [
          {
            label: "Silver Creek",
            selectAllCheckbox: true,
            collapsed: true,
            children: [
              { label: "Route 10", layer: routeLayers[10] },
              { label: "Route 11", layer: routeLayers[11] },
              { label: "Route 12", layer: routeLayers[12] },
              { label: "Route 13", layer: routeLayers[13] },
              { label: "Route 14", layer: routeLayers[14] },
              { label: "Route 15", layer: routeLayers[15] },
              { label: "Route 16", layer: routeLayers[16] },
              { label: "Route 17", layer: routeLayers[17] },
              { label: "Route 18", layer: routeLayers[18] },
              { label: "Route 19", layer: routeLayers[19] },
              { label: "Route 20", layer: routeLayers[20] },
              { label: "Route 23", layer: routeLayers[23] },
              { label: "Route 24", layer: routeLayers[24] },
              { label: "Route 25", layer: routeLayers[25] },
              { label: "Route 26", layer: routeLayers[26] },
              { label: "Route 27", layer: routeLayers[27] },
              { label: "Route 28", layer: routeLayers[28] },
              { label: "Route 29", layer: routeLayers[29] },
            ],
          },
          {
            label: "Lindale",
            selectAllCheckbox: true,
            collapsed: true,
            children: [
              { label: "Route 21", layer: routeLayers[21] },
              { label: "Route 22", layer: routeLayers[22] },
              { label: "Route 30", layer: routeLayers[30] },
              { label: "Route 31", layer: routeLayers[31] },
              { label: "Route 32", layer: routeLayers[32] },
              { label: "Route 33", layer: routeLayers[33] },
            ],
          },
          {
            label: "Kingston",
            selectAllCheckbox: true,
            collapsed: true,
            children: [
              { label: "Route 42", layer: routeLayers[42] },
              { label: "Route 43", layer: routeLayers[43] },
              { label: "Route 44", layer: routeLayers[44] },
              { label: "Route 45", layer: routeLayers[45] },
              { label: "Route 46", layer: routeLayers[46] },
              { label: "Route 47", layer: routeLayers[47] },
              { label: "Route 48", layer: routeLayers[48] },
            ],
          },
          {
            label: "Shannon",
            selectAllCheckbox: true,
            collapsed: true,
            children: [
              { label: "Route 50", layer: routeLayers[50] },
              { label: "Route 51", layer: routeLayers[51] },
              { label: "Route 52", layer: routeLayers[52] },
              { label: "Route 53", layer: routeLayers[53] },
              { label: "Route 61", layer: routeLayers[61] },
              { label: "Route 62", layer: routeLayers[62] },
            ],
          },
          {
            label: "Armuchee",
            selectAllCheckbox: true,
            collapsed: true,
            children: [
              { label: "Route 68", layer: routeLayers[68] },
              { label: "Route 69", layer: routeLayers[69] },
              { label: "Route 70", layer: routeLayers[70] },
              { label: "Route 71", layer: routeLayers[71] },
              { label: "Route 72", layer: routeLayers[72] },
              { label: "Route 73", layer: routeLayers[73] },
              { label: "Route 74", layer: routeLayers[74] },
              { label: "Route 75", layer: routeLayers[75] },
              { label: "Route 77", layer: routeLayers[77] },
              { label: "Route 78", layer: routeLayers[78] },
              { label: "Route 79", layer: routeLayers[79] },
            ],
          },
          {
            label: "Coosa",
            selectAllCheckbox: true,
            collapsed: true,
            children: [
              { label: "Route 80", layer: routeLayers[80] },
              { label: "Route 81", layer: routeLayers[81] },
              { label: "Route 82", layer: routeLayers[82] },
              { label: "Route 83", layer: routeLayers[83] },
              { label: "Route 84", layer: routeLayers[84] },
              { label: "Route 85", layer: routeLayers[85] },
              { label: "Route 91", layer: routeLayers[91] },
            ],
          },
          {
            label: "Problems",
            selectAllCheckbox: true,
            collapsed:true,
            children: [
            { label: "Dead Head", layer: "" },
            { label: "Error Code", layer: "" },
            { label: "Manual Read", layer: "" },
            { label: "Crew", layer: "" },
            ]
          }
        ],
      };

      const treeLayerControl = L.control.layers.tree(
        baseTree,
        mapRoutes,
        options
      );
      treeLayerControl.addTo(map);
    }

     addMarkersToMap(map, meters);
  });
</script>

<div id="map" style="height:700px;border-radius:0.25rem;margin-top:3rem;margin-bottom:3rem;" />


<style>
  #map {
    width: 100%;
  }
</style>

