// /src/lib/components/Header.svelte
<script>
  import { onMount } from 'svelte';
  import banner from '$lib/assets/banner.png';

  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  const closeMenu = () => {
    isMenuOpen = false;
  };

  onMount(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    border: #242323;
    border-bottom: 1px solid #242323;
  }

  .logo {
    height: 30px;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .nav-links a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
  }

  .nav-links a:hover {
    text-decoration: underline;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
  }

  .hamburger div {
    width: 24px;
    height: 2px;
    background: #ffffff;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 60px;
      right: 1rem;
      background: #333333;
      padding: 1rem;
      border: 1px solid #242323;
      border-radius: 4px;
    }

    .nav-links.open {
      display: flex;
    }

    .hamburger {
      display: flex;
    }
  }
</style>

<header>
  <a href="/">
    <img src={banner} alt="Fryde Logo" class="logo" />
  </a>
  <div class="hamburger" on:click={toggleMenu}>
    <div></div>
    <div></div>
    <div></div>
  </div>

  <nav class="nav-links {isMenuOpen ? 'open' : ''}">
    <a href="/status" on:click={closeMenu}>Status</a>
    <a href="https://discord.gg/gWnkSaPCXw" on:click={closeMenu}>Discord</a>
    <a href="/contact" on:click={closeMenu}>Contact Us</a>
  </nav>
</header>