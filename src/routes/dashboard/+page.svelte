<!--/src/routes/dashboard/+page.svelte-->
<script lang="ts">
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header/Header.svelte';
    import Footer from '$lib/components/Footer/Footer.svelte';
    import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
    import { checkAuth, redirectToLogin } from '$lib/utils/auth';
    import '$lib/components/Global/Background.css';

    interface User {
        email: string;
        createdAt: string;
        displayName: string;
        username: string;
    }

    let isSidebarOpen = false;
    let user: User | null = null;

    onMount(async () => {
        const { isAuthenticated, user: userData } = await checkAuth();
        if (!isAuthenticated) {
            redirectToLogin();
            return;
        }
        user = userData as User;
    });

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }
</script>

<Header />

<div class="dashboard-container">
    <button class="menu-button" on:click={toggleSidebar} aria-label="Toggle navigation menu">
        <span class="menu-icon" class:open={isSidebarOpen}></span>
    </button>

    <Sidebar isOpen={isSidebarOpen} />

    <main>
        {#if user}
            <h1>Welcome, {user.displayName}!</h1>
        {:else}
            <p>Loading...</p>
        {/if}
    </main>
</div>

<Footer />

<style>
    .dashboard-container {
        position: relative;
        min-height: calc(100vh - 52px - 89px);
        margin-top: 52px;
        margin-bottom: 89px;
    }

    main {
        padding: 2rem;
        margin-left: 250px;
        transition: margin-left 0.3s ease;
    }

    .menu-button {
        position: fixed;
        top: 64px;
        left: 1rem;
        z-index: 99;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        display: none;
    }

    .menu-icon {
        display: block;
        width: 25px;
        height: 3px;
        background-color: white;
        position: relative;
        transition: all 0.3s ease;
    }

    .menu-icon::before,
    .menu-icon::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: white;
        transition: all 0.3s ease;
    }

    .menu-icon::before {
        top: -8px;
    }

    .menu-icon::after {
        bottom: -8px;
    }

    .menu-icon.open {
        background-color: transparent;
    }

    .menu-icon.open::before {
        transform: rotate(45deg);
        top: 0;
    }

    .menu-icon.open::after {
        transform: rotate(-45deg);
        bottom: 0;
    }

    @media (max-width: 768px) {
        main {
            margin-left: 0;
            padding-top: 1rem;
        }

        .menu-button {
            display: block;
        }
    }

    h1 {
        color: white;
        margin-bottom: 2rem;
    }
</style>