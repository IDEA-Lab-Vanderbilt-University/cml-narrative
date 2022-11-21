<!--
 /src/routes/+layout.svelte
 +layout.svelte
 cml-narrative
 
 Created by Ian Thompson on September 7th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script>
	import '../app.css';
	import Modal from 'svelte-simple-modal';

</script>

<Modal>
	<slot />
</Modal>
