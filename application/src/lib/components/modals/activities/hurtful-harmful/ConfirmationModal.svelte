<!--
 ConfirmationModal.svelte
 application
 
 Created by Ian Thompson on September 27th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script>
    export let detail;

    const handleSubmit = () => {

    }
</script>
<div class="w-full flex flex-col justify-center items-center space-y-3">
    <img src={detail.items[0].img} alt="" class="w-24">
    <p class="text-xl font-bold">How is this technology {detail.id}?</p>
    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your response..."></textarea>
    <button class="bg-green-400 rounded-md py-2 px-4 text-white hover:bg-transparent border-2 border-green-400 hover:text-black transition delay-100 ease-in-out">Submit</button>
</div>