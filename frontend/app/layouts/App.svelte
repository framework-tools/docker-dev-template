<script>
import Sidebar from "@/includes/Sidebar.svelte"
import Header from "@/includes/Header.svelte"
</script>
    <div class="framework-app">
        <Sidebar/>
        <Header/>
        <div class="content">
            <slot/>
        </div>
    </div>
<style lang="stylus">
.framework-app
    display grid
    grid-template-columns 280px 1fr
    grid-template-rows 40px 1fr
    flex 1
    background #F5F7F8

.content
    background white
    border-top-left-radius 15px

:global
    @import 'stylus/normalise'
    @import 'stylus/variables'
    *
        font-family 'Roboto'

    html, body, #app
        display flex
        min-height 100%
        flex 1
        color $dark
    h1, h2, h3, h4, h5, h6
        font-weight 500
    
</style>
<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" defer>
</svelte:head>