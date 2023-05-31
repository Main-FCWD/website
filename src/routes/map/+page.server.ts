/* import type { LayoutServerLoad } from '/Users/jtylerstahl/Documents/VSCode/Svelte/website/.svelte-kit/types/src/routes/$types';
import { supabaseClient } from "$lib/supabase";

export const load: LayoutServerLoad = async () => {
	const { data: GPS, error: err_GPS } = await supabaseClient.from("GPS").select();
	if (!GPS) throw err_GPS;
		
  console.log("Ran layout load");
  return {
	GPS: GPS,
  };
}; */