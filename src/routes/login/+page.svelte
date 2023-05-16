<script lang="ts">
	import "@picocss/pico";
  </script>
  
  <article class="grid" style="width: fit-content; margin: auto;">
	<div>
	  <hgroup>
		<h1>Log in</h1>
		<h2>Placeholder text</h2>
	  </hgroup>
	  <form
		action="?/login"
		method="POST"
	  >
		<input type="email" name="email" placeholder="Email" />
		<input type="password" name="password" placeholder="Password" />
		<fieldset>
		  <label for="remember">
			<input type="checkbox" role="switch" id="remember" name="remember" />
			Remember me
		  </label>
		</fieldset>
		<button type="submit" style="width: auto;" class="contrast">Log in</button>
	  </form>
	</div>
  </article>
