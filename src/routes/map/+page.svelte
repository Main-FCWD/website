<script lang="ts">
  import { onMount } from "svelte";
  import L, { icon } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import type { PageData } from "/Users/jtylerstahl/Documents/VSCode/Svelte/website/.svelte-kit/types/src/routes/$types";

  export let data: PageData;
  const meters = data.GPS as Object;


  let map: L.Map | L.LayerGroup<any>;


  onMount(async () => {
    map = L.map("map", {
      zoomControl: true,
      maxZoom: 35,
      minZoom: 1,
    });
    console.log(map)

    map.setView([34.330395361608595, -85.2480697631836], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );


    function createRouteIcons(): { [key: string]: L.Icon } {
      const routeIcons: { [key: string]: L.Icon } = {};
      console.log(routeIcons);

      for (let routeNumber = 10; routeNumber <= 91; routeNumber++) {
        const iconUrl = `src/Data/markers/rt${routeNumber}.png`;
        const icon = L.icon({
          iconUrl,
          iconSize: [25, 25], // Adjust the size as per your requirements
          className: routeNumber
        });

        routeIcons[routeNumber.toString()] = icon;
      }

      return routeIcons;
    }

    const routeIcons = createRouteIcons();
    console.log("Called routeIcons: ", routeIcons);
    console.log("icon: ", icon)



    for (let i = 10; i < meters.length; i++) {

      if (meters[i].Route = routeIcons[i]) {

        L.marker([meters[i].Y, meters[i].X], { icon: routeIcons[i]})
          .addTo(map)
          .bindPopup(meters[i].Address);
      }
    }
  });
</script>

<div id="map" style="height: 800px;border-radius:0.5rem;margin-top:3rem;" />

<style>
  #map {
    width: 100%;
  }
</style>
