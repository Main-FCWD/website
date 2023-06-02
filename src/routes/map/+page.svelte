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
          routeLayers[Route] = L.layerGroup().addTo(map);
        }

        marker.addTo(routeLayers[Route]);
      });

      const treeLayerControl = L.control.layers.tree(
        baseTree,
        routeLayers,
        options
      );
      treeLayerControl.addTo(map);
    }

    addMarkersToMap(map, meters);
  });
</script>

<div id="map" style="height:45vmax;border-radius:0.25rem;margin-top:3rem;margin-bottom:3rem;" />


<style>
  #map {
    width: 100%;
  }
</style>
