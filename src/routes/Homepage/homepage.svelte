<!-- src/routes/Homepage/homepage.svelte -->
<script>
  import { onMount } from 'svelte';

  let box = {
    x: 0,
    y: 0,
    width: 120,
    height: 60,
    dx: 1.5,
    dy: 1.5
  };

  let contentHeight = 0;
  let contentWidth = 0;
  let contentTop = 0;


  // deepseek bs, i aint that smart to make this yet
  onMount(() => {
    const contentArea = document.querySelector('.content-area') || document.body;
    const rect = contentArea.getBoundingClientRect();
    
    contentHeight = rect.height;
    contentWidth = rect.width;
    contentTop = rect.top;

    box.x = (contentWidth - box.width) / 2;
    box.y = (contentHeight - box.height) / 2;

    const animate = () => {
      requestAnimationFrame(animate);

      box.x += box.dx;
      box.y += box.dy;
      if (box.x + box.width > contentWidth || box.x < 0) {
        box.dx = -box.dx;
      }
      if (box.y + box.height > contentHeight || box.y < 0) {
        box.dy = -box.dy;
      }
    };

    animate();
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

<div class="no-content-box" 
     style="left: {box.x}px; 
            top: {box.y + contentTop}px; 
            width: {box.width}px; 
            height: {box.height}px">
  no content
</div>

<style>
  .no-content-box {
    position: absolute;
    background-color: black;
    border: 2px solid #ccc;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    pointer-events: none;
  }
</style>
