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
  <title>Not found</title>
</svelte:head>

<div class="not-found-box" 
     style="left: {box.x}px; 
            top: {box.y + contentTop}px; 
            width: {box.width}px; 
            height: {box.height}px">
  Not found
</div>

<style>
  .not-found-box {
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