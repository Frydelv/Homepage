<script>
    import Header from '$lib/components/Header/Header.svelte';
    import Footer from '$lib/components/Footer/Footer.svelte';
    import '$lib/components/Global/Background.css';
    import { env } from '$env/dynamic/public';

    const handleGoogleRegister = () => {
        window.location.href = `${env.PUBLIC_SERVER_URL}/auth/google`;
    };
</script>

<Header />

<div class="auth-container">
    <div class="auth-box">
        <h1>Register</h1>
        <button class="google-btn" on:click={handleGoogleRegister}>
            Register with Google
        </button>
    </div>
</div>

<Footer />

<style>
    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 140px);
    }

    .auth-box {
        background: rgba(36, 35, 35, 0.9);
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        width: 100%;
        max-width: 400px;
        border: 1px solid #333;
    }

    h1 {
        margin-bottom: 2rem;
        color: #ffffff;
    }

    .google-btn {
        background: #ffffff;
        color: #333333;
        border: none;
        padding: 12px 24px;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
    }

    .google-btn:hover {
        background: #f0f0f0;
        transform: translateY(-2px);
    }
</style>