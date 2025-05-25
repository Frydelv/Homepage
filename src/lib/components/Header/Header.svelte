<!--/src/lib/components/Header/Header.svelte-->
<script lang="ts">
  import { onMount } from 'svelte';
  import banner from '$lib/assets/banner.png';
  import { gsap } from "gsap";
  import { checkAuth } from '$lib/utils/auth';
  import { env } from '$env/dynamic/public';

  interface User {
    displayName: string;
    username: string;
    email: string;
    createdAt: string;
  }

  let isMenuOpen = false;
  let isProfileMenuOpen = false;
  let user: User | null = null;
  let isLoading = true;
  let isMobile = false;

  const checkMobile = () => {
    isMobile = window.innerWidth <= 768;
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (isProfileMenuOpen && !(event.target as Element).closest('.profile-section')) {
      closeProfileMenu();
    }
  };

  // close (esc)
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeProfileMenu();
      closeMenu();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleProfileMenu();
    }
  };

  const setupEventListeners = () => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  };

  const handleResize = () => {
    checkMobile();
    if (window.innerWidth > 768) {
      closeMenu();
      if (!isMobile) closeProfileMenu();
    }
  };

  const toggleMenu = () => {
    if (isProfileMenuOpen) closeProfileMenu();
    isMenuOpen = !isMenuOpen;
  };

  const closeMenu = () => {
    isMenuOpen = false;
  };

  const toggleProfileMenu = () => {
    if (isMenuOpen) closeMenu();
    isProfileMenuOpen = !isProfileMenuOpen;
  };

  const closeProfileMenu = () => {
    isProfileMenuOpen = false;
  };



  const logout = async () => {
    try {
      const response = await fetch(`${env.PUBLIC_SERVER_URL}/v1/user/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });
      if (response.ok || response.status === 302) {
        user = null;
        closeProfileMenu();
        window.location.href = '/login';
      } else {
        const error = await response.json();
        console.error('Logout failed:', error);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const { isAuthenticated, user: authUser } = await checkAuth();
      if (isAuthenticated && authUser) {
        user = authUser;
      } else {
        user = null;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      user = null;
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    checkMobile();
    const cleanup = setupEventListeners();
    
    const initializeApp = async () => {
      await checkAuthStatus();

      gsap.from("header", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
      });

      gsap.from(".logo", {
        scale: 0.8,
        rotation: -5,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });
    };

    initializeApp();
    return cleanup;
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
    border: none;
    border-bottom: 1px solid #242323;
    position: relative;
    z-index: 100;
  }

  .logo {
    height: 30px;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    position: relative;
    z-index: 101;
  }

  .nav-links a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .nav-links a:hover {
    text-decoration: none;
    opacity: 0.8;
    transform: translateY(-2px);
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
    z-index: 102;
  }

  .hamburger div {
    width: 24px;
    height: 2px;
    background: #ffffff;
    transition: all 0.3s ease;
  }

  .profile-section {
    position: relative;
  }

  .profile-button {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .profile-button:hover {
    transform: scale(1.1);
  }

  .profile-button:focus {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
    border-radius: 50%;
  }

  .profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: block;
  }

  .profile-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: #333333;
    border: 1px solid #242323;
    border-radius: 8px;
    padding: 1rem;
    min-width: 200px;
    display: none;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1001;
    margin-top: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .profile-menu.open {
    display: flex;
    animation: slideDown 0.3s ease forwards;
  }

  .profile-menu .user-info {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #242323;
    text-align: center;
  }

  .profile-menu .user-info p {
    margin: 0;
    font-weight: 500;
  }

  .profile-menu .user-info small {
    color: #999;
  }

  .profile-menu a, .profile-menu button {
    padding: 0.5rem;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all 0.3s ease;
    width: 100%;
  }

  .profile-menu a:hover, .profile-menu button:hover {
    background: #242323;
    border-radius: 4px;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(2px);
    z-index: 99;
    animation: fadeIn 0.2s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(2px);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (max-width: 768px) {
    .nav-links {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .nav-links:not(.has-user) {
      display: none;
      flex-direction: column;
      position: fixed;
      top: 60px;
      left: 0;
      width: 100%;
      height: calc(100vh - 60px);
      background: #333333;
      padding: 2rem;
      border-top: 1px solid #242323;
      z-index: 1000;
      justify-content: flex-start;
    }

    .nav-links:not(.has-user).open {
      display: flex;
    }

    .hamburger {
      display: none;
    }

    .hamburger.show {
      display: flex;
    }

    .profile-menu {
      position: fixed;
      top: 60px;
      bottom: auto;
      right: 0;
      left: auto;
      width: auto;
      min-width: 250px;
      border-radius: 0 0 8px 8px;
      margin: 0;
      padding: 1rem;
      background: #333333;
      border: 1px solid #242323;
      border-top: none;
    }

    .profile-menu .user-info {
      margin-bottom: 1rem;
    }

    .profile-button {
      margin-right: 0;
    }
  }
</style>

<header>
  <a href="/">
    <img src={banner} alt="Fryde Logo" class="logo" />
  </a>
  <button class="hamburger {!user ? 'show' : ''}" on:click={toggleMenu} aria-label="Toggle menu">
    <div></div>
    <div></div>
    <div></div>
  </button>

  <nav class="nav-links {isMenuOpen ? 'open' : ''} {user ? 'has-user' : ''}">
    {#if !isLoading}
      {#if !user}
        <a href="/login" on:click={closeMenu}>Login</a>
        <a href="/register" on:click={closeMenu}>Register</a>
      {:else}
        <div class="profile-section">
          <button 
            class="profile-button"
            on:click={toggleProfileMenu}
            on:keydown={handleKeyDown}
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="true"
            aria-label="Profile menu"
          >
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=random`} 
              alt={`${user.displayName}'s profile`}
              class="profile-pic"
            />
          </button>
          <div 
            class="profile-menu {isProfileMenuOpen ? 'open' : ''}"
            role="menu"
            aria-label="Profile menu"
          >
            <div class="user-info">
              <p>{user.displayName}</p>
              <small>@{user.username}</small>
            </div>
            <a href="/dashboard" on:click={closeProfileMenu} role="menuitem">Dashboard</a>
            <a href="/settings" on:click={closeProfileMenu} role="menuitem">Settings</a>
            <button on:click={logout} role="menuitem">Logout</button>
          </div>
        </div>
      {/if}
    {/if}
  </nav>
</header>

{#if isProfileMenuOpen}
  <div 
    class="overlay" 
    on:click={closeProfileMenu}
    role="presentation"
  ></div>
{/if}