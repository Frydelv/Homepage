<!--/src/routes/dashboard/apikey/+page.svelte-->
<script lang="ts">
    import { onMount } from 'svelte';
    import { env } from '$env/dynamic/public';
    import { checkAuth, redirectToLogin } from '$lib/utils/auth';
    import Header from '$lib/components/Header/Header.svelte';
    import Footer from '$lib/components/Footer/Footer.svelte';
    import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
    import '$lib/components/Global/Background.css';


    let apiKey: string | null = null;
    let isLoading = true;
    let error: string | null = null;
    let isKeyVisible = false;
    let isSidebarOpen = false;

    async function fetchApiKey() {
        try {
            const response = await fetch(`${env.PUBLIC_SERVER_URL}/v1/user/apikey/view`, {
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json();
                apiKey = data.apiKey;
                error = null;
            } else if (response.status === 404) {
                apiKey = null;
                error = null;
            } else {
                const data = await response.json();
                error = data.error || 'An error occurred';
                apiKey = null;
            }
        } catch (err) {
            error = 'Failed to fetch API key';
            apiKey = null;
        } finally {
            isLoading = false;
        }
    }

    async function createApiKey() {
        try {
            isLoading = true;
            const response = await fetch(`${env.PUBLIC_SERVER_URL}/v1/user/apikey/create`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json();
                apiKey = data.apiKey;
                error = null;
            } else {
                const data = await response.json();
                error = data.error || 'Failed to create API key';
            }
        } catch (err) {
            error = 'Failed to create API key';
        } finally {
            isLoading = false;
        }
    }

    async function copyToClipboard() {
        if (apiKey) {
            try {
                await navigator.clipboard.writeText(apiKey);
            } catch (err) {
                error = 'Failed to copy API key';
            }
        }
    }

    onMount(async () => {
        const { isAuthenticated } = await checkAuth();
        if (!isAuthenticated) {
            redirectToLogin();
            return;
        }
        fetchApiKey();
    });    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }
</script>

<Header />

<div class="dashboard-container">
    <button class="menu-button" on:click={toggleSidebar} aria-label="Toggle navigation menu">
        <span class="menu-icon" class:open={isSidebarOpen}></span>
    </button>    <Sidebar isOpen={isSidebarOpen} />

    <main>
        <h1>API Key Management</h1>

        {#if isLoading}
            <div class="loading">Loading...</div>
        {:else if error}
            <div class="error">{error}</div>
        {:else if apiKey}
            <div class="api-key-container">
                <div class="api-key-box">
                    <div class="key-wrapper">
                        <span class:blurred={!isKeyVisible}>{apiKey}</span>
                    </div>
                    <div class="button-group">
                        <button class="visibility-toggle" on:click={() => isKeyVisible = !isKeyVisible}>
                            {isKeyVisible ? 'Hide' : 'Show'}
                        </button>
                        <button class="copy-button" on:click={copyToClipboard}>
                            Copy
                        </button>
                    </div>
                </div>
                <p class="info-text">Keep your API key secure and do not share it with others.</p>
            </div>
        {:else}
            <div class="create-key-container">
                <p>You don't have an API key yet.</p>
                <button class="create-button" on:click={createApiKey}>Create API Key</button>
            </div>
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

    h1 {
        color: white;
        margin-bottom: 2rem;
    }

    .api-key-container {
        background: #1a1a1a;
        padding: 2rem;
        border-radius: 8px;
        max-width: 600px;
    }

    .api-key-box {
        background: #2a2a2a;
        padding: 1rem;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        gap: 1rem;
    }

    .key-wrapper {
        flex: 1;
        overflow-x: auto;
        padding: 0.5rem;
        background: #222;
        border-radius: 4px;
        min-width: 0;
    }    .key-wrapper span {
        font-family: monospace;
        white-space: nowrap;
        display: block;
    }

    .blurred {
        filter: blur(6px);
        user-select: none;
    }

    .button-group {
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
    }

    .visibility-toggle, .create-button, .copy-button {
        background: #4a4a4a;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
        white-space: nowrap;
    }

    .visibility-toggle:hover, .create-button:hover, .copy-button:hover {
        background: #5a5a5a;
    }

    .create-button {
        background: #3d8b40;
    }

    .create-button:hover {
        background: #4a9f4d;
    }

    .error {
        color: #ff6b6b;
        padding: 1rem;
        background: rgba(255, 107, 107, 0.1);
        border-radius: 4px;
        margin-bottom: 1rem;
    }

    .loading {
        color: white;
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

    /* Style the scrollbar for better visibility */
    .key-wrapper::-webkit-scrollbar {
        height: 4px;
    }

    .key-wrapper::-webkit-scrollbar-track {
        background: #222;
        border-radius: 2px;
    }

    .key-wrapper::-webkit-scrollbar-thumb {
        background: #444;
        border-radius: 2px;
    }

    .key-wrapper::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>