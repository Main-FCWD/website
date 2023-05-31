import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from './$types'
import { supabaseClient } from "$lib/supabase";



export const load: LayoutServerLoad = async (event) => {
	const { data: profiles, error: err } = await supabaseClient.from("profiles").select();
	if (!profiles) throw err;
	const { data: staff, error: err_staff } = await supabaseClient.from("staff").select();
	if (!staff) throw err_staff;
	const { data: GPS, error: err_GPS } = await supabaseClient.from("GPS").select();
	if (!staff) throw err_GPS;
		
  console.log("Ran layout load");
  return {
    session: await getServerSession(event),
	profiles:  profiles,
	staff: staff,
	GPS: GPS,  
};
  
};

