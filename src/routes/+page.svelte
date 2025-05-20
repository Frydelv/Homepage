<!--/src/routes/+page.svelte-->
<script>
    import Header from '$lib/components/Header/Header.svelte'
    import Footer from '$lib/components/Footer/Footer.svelte'
    import '$lib/components/Global/Background.css';
    import Homepage from './Homepage/homepage.svelte';
</script>

<Header />
<Homepage />
<Footer />

<body>
</body>