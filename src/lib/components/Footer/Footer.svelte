<!--/src/lib/components/Footer/Footer.svelte-->
<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import Discord from '$lib/assets/icons/discord.svg';
    import Github from '$lib/assets/icons/github.svg';
    import Instagram from '$lib/assets/icons/instagram.svg';
    import Telegram from '$lib/assets/icons/telegram.svg';
    import Tiktok from '$lib/assets/icons/tiktok.svg';

    onMount(() => {
        gsap.set('footer', { opacity: 1 });
        gsap.set('.copyright', { opacity: 1 });
        gsap.set('.social-icons a', { opacity: 1 });
        setTimeout(() => {
            // footer animations
            gsap.from('footer', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
            gsap.from('.copyright', {
                y: -10,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
                delay: 0.2
            });

            // icons popup
            gsap.from('.social-icons a', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.4
            });

            // Hover animations for icons
            const icons = document.querySelectorAll('.social-icons a');
            icons.forEach(icon => {
                icon.addEventListener('mouseenter', () => {
                    gsap.to(icon, {
                        y: -5,
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
                icon.addEventListener('mouseleave', () => {
                    gsap.to(icon, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        }, 50);
    });
</script>

<style>
    footer {
        position: fixed;
        padding: 10px;
        margin: 0;
        bottom: 0;
        right: 0;
        left: 0;
        text-align: center;
        border-top: 1px solid #242323;
        background: inherit;
        transform: translateY(0);
        will-change: transform;
        opacity: 1 !important;
    }
    p {
        margin: 0 0 10px 0;
        opacity: 1 !important;
    }
    .social-icons {
        display: flex;
        justify-content: center;
        gap: 15px;
    }
    .social-icons a {
        width: 24px;
        height: 24px;
        fill: currentColor;
        transition: opacity 0.2s ease;
        transform-origin: center;
        will-change: transform;
        display: inline-block;
        opacity: 1 !important;
    }
    .social-icons a:hover {
        opacity: 0.8 !important;
    }
    .social-icons img {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>

<footer>
    <p class="copyright">© 2024 - {new Date().getFullYear()} Fryde</p>
    <div class="social-icons">
        <a href="https://discord.gg/gWnkSaPCXw" aria-label="Discord">
            <img src={Discord} width="24" height="24" alt="Discord" />
        </a>
        <a href="https://github.com/frydelv" aria-label="GitHub">
            <img src={Github} width="24" height="24" alt="GitHub" />
        </a>
        <a href="https://instagram.com/frydelv" aria-label="Instagram">
            <img src={Instagram} width="24" height="24" alt="Instagram" />
        </a>
        <a href="https://t.me/frydelv" aria-label="Telegram">
            <img src={Telegram} width="24" height="24" alt="Telegram" />
        </a>
        <a href="https://tiktok.com/@frydelv" aria-label="TikTok">
            <img src={Tiktok} width="24" height="24" alt="TikTok" />
        </a>
    </div>
</footer>