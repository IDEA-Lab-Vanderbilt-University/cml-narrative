<script lang="ts">
	import { goto } from "$app/navigation";
	import DataService from "$lib/utils/DataService";


    let email: string;
    let errorMessage: string = '';
    let successMessage: string = '';

    async function resetPassword() {
        if (!email) {
            errorMessage = "Please enter your email.";
            return;
        }

        try {
            await DataService.Auth.forgotPassword(email);
            successMessage = "Password reset link sent to your email.";
            goto('/teacher');
        } catch (error) {
            console.error("Error sending reset link:", error);
            errorMessage = "Error sending reset link: " + error.message;
        }
    }
</script>



<div class="flex h-full w-full flex-col items-center justify-center">
    <div class="my-5 flex w-full items-center justify-center">
        <h1 class="text-3xl font-bold text-white">Teacher Forgot Password</h1>
    </div>

    <p class="text-lg text-white">Please enter your email to reset your password.</p>

    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}
    {#if successMessage}
        <p class="text-green-500">{successMessage}</p>
    {/if}

    <input
        type="email"
        placeholder="Email"
        class="mt-3 w-64 rounded-md bg-white px-4 py-3 shadow-md"
        bind:value={email} />

    <button
        on:click={async () => {
            await resetPassword();
        }}
        class="mt-5 flex h-8 items-center justify-center gap-5 rounded-full bg-blue-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
        <p class="text-l font-bold text-gray-800">Reset Password</p>
    </button>
    <button
        on:click={() => {
            goto('/teacher');
        }}
        class="mt-5 flex h-8 items-center justify-center gap-5 rounded-full bg-green-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
        <p class="text-l font-bold text-gray-800">Back to Login</p>
    </button>
</div>



<style>


</style>