<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import '../app.postcss';
	import "@picocss/pico";

	export let data: PageData;

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<!-- Navigation Bar -->
<nav class="container-fluid" style="width: 95%">
	<ul>
	  <li>
		<a class="contrast" href="./"
		  ><strong>Floyd County Water Department</strong></a
		>
	  </li>
	</ul>
	<ul>
	  {#if data.session}
		<li><a href="/">{data.session.user.email}</a></li>
		<form
		  style="margin-bottom: 0; padding-top: 20px; padding-left: 30px;"
		  method="POST" use:enhance={submitLogout} action="/logout">
		  <button type="submit" class="secondary outline" style="padding: .5rem">Log out</button>
		</form>
	  {:else}
		<li><a role="button" href="/login">Log in</a></li>
		<li><a href="/register">Register</a></li>
	  {/if}
	</ul>
  </nav>
  {#if data.session}
  <nav class="container-fluid" style="background: var(--code-background-color); width: 90%; border-radius: .5rem;">
	<ul>
	  <li><h6 style="margin-bottom: 0; margin-right: 3rem">Welcome, {data.session.user}</h6></li>
	  <li><a href="/table" class="secondary"><u>Meter Table</u></a></li>
	  <li><a href="/posts" class="secondary"><u>Posts</u></a></li>
	  <li><a href="/map" class="secondary"><u>Map</u></a></li>
	</ul>
  </nav>
  {/if}
  
  <!-- Main Area -->
  
  <main class="container-fluid" style="width: 95%; position: sticky;">
	<slot />
  </main>
  
  <!-- Footer -->
  
  <footer class="container-fluid" style="padding-top: 0; padding-bottom: 1%; position: fixed; bottom: 0px">
	<small>Floyd County Water Department</small>
  </footer>
  
