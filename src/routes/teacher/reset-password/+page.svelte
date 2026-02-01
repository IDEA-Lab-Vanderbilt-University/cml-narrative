<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
    import DataService from "$lib/utils/DataService";

    // Get token from URL
    let token;

    if (browser) {
        token = new URLSearchParams(window.location.search).get("token");
    }

    let newPassword: string;
    let confirmPassword: string;
    let errorMessage: string = '';

    if (browser && !token) {
        goto('/teacher/forgot-password');
    }

    async function resetPassword() {
        if (!newPassword || !confirmPassword) {
            errorMessage = "Please enter both password fields.";
            return;
        }

        if (newPassword !== confirmPassword) {
            errorMessage = "Passwords do not match.";
            return;
        }

        if (newPassword.length < 6) {
            errorMessage = "Password must be at least 6 characters long.";
            return;
        }

        try {
            await DataService.Auth.resetPassword(token, newPassword);
            goto('/teacher');
        } catch (error) {
            console.error("Error resetting password:", error);
            errorMessage = "Error resetting password: " + error.message;
        }
    }
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
    <div class="my-5 flex w-full items-center justify-center">
        <h1 class="text-3xl font-bold text-white">Teacher Reset Password</h1>
    </div>

    <p class="text-lg text-white">Please enter your new password.</p>

    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}

    <input
        type="password"
        placeholder="New Password"
        class="mt-3 w-64 rounded-md bg-white px-4 py-3 shadow-md"
        bind:value={newPassword} />

    <input
        type="password"
        placeholder="Confirm Password"
        class="mt-3 w-64 rounded-md bg-white px-4 py-3 shadow-md"
        bind:value={confirmPassword} />

    <button
        on:click={async () => {
            if (newPassword !== confirmPassword) {
                errorMessage = "Passwords do not match.";
                return;
            }
            try {
                await resetPassword();
            } catch (error) {
                console.error("Error resetting password:", error);
                errorMessage = "Error resetting password: " + error.message;
            }
        }}
        class="mt-5 flex h-8 items-center justify-center gap-5 rounded-full bg-blue-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
        <p class="text-l font-bold text-gray-800">Reset Password</p>
    </button>
</div>

<style>

</style>