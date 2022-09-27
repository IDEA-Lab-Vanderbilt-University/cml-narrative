<!--
 +layout.svelte
 application
 
 Created by Ian Thompson on September 1st 2022
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
