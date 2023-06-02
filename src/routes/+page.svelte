<script lang="ts">
  import { onMount } from "svelte";
  onMount(() => {
    let isLight = true;

    const switchTheme: any = document.getElementById("theme_switcher");
    console.log(switchTheme);
    const os_default = "src/Data/images/default.svg";
    const sun = "src/Data/images/sun.svg";
    const moon = "src/Data/images/moon.svg";
    const html = document.documentElement;
    switchTheme.src = os_default;
    html.setAttribute("data-theme", "auto");
    switchTheme.setAttribute("data-tooltip", "os theme");
    switchTheme.focus();
    // removeTooltip(3000);
    switchTheme.addEventListener("click", (e: any) => {
      e.preventDefault();
      isLight = !isLight;
      html.setAttribute("data-theme", isLight ? "light" : "dark");
      switchTheme.src = isLight ? sun : moon;
      console.log(switchTheme);
      switchTheme.setAttribute(
        "data-tooltip",
        `theme ${isLight ? "light" : "dark"}`
      );
      removeTooltip();
    });
    const removeTooltip = (timeInt = 1750) => {
      setTimeout(() => {
        switchTheme.blur();
      }, timeInt);
    };
  });
</script>
