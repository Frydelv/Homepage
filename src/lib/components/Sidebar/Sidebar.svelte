<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { browser } from '$app/environment';
    
    export let isOpen = false;
    let sidebarEl: HTMLElement;
    let isMobile = false;
    
    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    });
    
    function checkMobile() {
        isMobile = window.innerWidth <= 768;
        if (isMobile && !isOpen && sidebarEl) {
            gsap.set(sidebarEl, { x: '-100%' });
        }
    }
    
    $: if (browser && sidebarEl && isMobile) {
        if (isOpen) {
            gsap.to(sidebarEl, {
                x: '0%',
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(sidebarEl, {
                x: '-100%',
                duration: 0.3,
                ease: 'power2.in'
            });
        }
    }
</script>

<div class="sidebar" class:open={isOpen} bind:this={sidebarEl}>
    {#if isOpen && isMobile}
        <button class="close-button" on:click={() => isOpen = false} aria-label="Close sidebar">
            <span>×</span>
        </button>
    {/if}
    <nav>
        <ul>
            <li>
                <a href="/dashboard/apikey" class="nav-link">
                    API Key
                </a>
            </li>
        </ul>
    </nav>
</div>

<style>
    .sidebar {
        position: fixed;
        top: 80px;
        left: 0;
        height: calc(100vh - 52px - 105px);
        width: 250px;
        background-color: #1a1a1a;
        color: white;
        padding: 1rem;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
        z-index: 98;
        overflow-y: auto;
    }

    .close-button {
        display: none;
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 4px;
    }

    .close-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
        padding-top: 40px; 
    }

    .nav-link {
        display: block;
        padding: 0.75rem 1rem;
        color: white;
        text-decoration: none;
        border-radius: 0.5rem;
        transition: background-color 0.2s;
    }

    .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
        .sidebar {
            width: 100%;
            top: 52px;
            height: calc(100vh - 52px - 89px);
            transform: translateX(-100%);
        }

        .close-button {
            display: block;
        }

        .sidebar.open {
            transform: translateX(0);
        }
    }
</style>