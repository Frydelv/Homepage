<!-- src/routes/Homepage/homepage.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let requestCount = 0;
  let countElement: HTMLDivElement;

  async function fetchRequests() {
    try {
      const response = await fetch('https://api.fryde.id.lv/requests');
      const data: { requests: number } = await response.json();
      animateCounter(data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }

  function animateCounter(newValue: number) {
    gsap.to(countElement, {
      innerHTML: newValue,
      duration: 1,
      snap: { innerHTML: 1 },
      ease: "power2.out"
    });
  }

  onMount(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 3000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Fryde - Innovative Software Solutions & Development</title>
  <meta name="author" content="Fryde">
  <meta name="description" content="Fryde is a cutting-edge software company specializing in custom software development, digital solutions, and innovative technology services for businesses.">
  <meta name="keywords" content="software development, custom software, technology solutions, digital transformation, software company">
  <meta name="robots" content="index, follow">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="canonical" href="https://fryde.id.lv/">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://fryde.id.lv">
  <meta property="og:title" content="Fryde - Innovative Software Solutions">
  <meta property="og:description" content="Transform your business with custom software solutions and innovative technology services by Fryde.">
  <meta property="og:image" content="https://fryde.id.lv/og-image.jpg">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://fryde.id.lv/">
  <meta name="twitter:title" content="Fryde - Innovative Software Solutions">
  <meta name="twitter:description" content="Transform your business with custom software solutions and innovative technology services by Fryde.">
  <meta name="twitter:image" content="https://fryde.id.lv/twitter-image.jpg">
</svelte:head>

<div class="counter-container">
  <div class="counter" bind:this={countElement}>0</div>
  <div class="label">Total Requests</div>
</div>

<style>
  .counter-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: sans-serif;
  }

  .counter {
    font-size: 8rem;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
  }

  .label {
    font-size: 1.5rem;
    color: #fff;
    margin-top: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
</style>
