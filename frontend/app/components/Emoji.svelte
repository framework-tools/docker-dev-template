<span class="emoji">
    {#if symbol}
        {symbol}
    {/if}
    {#if component}
        <svelte:component this={component}/>
    {/if}
</span>
<script>
export let symbol = undefined
export let component = undefined
</script>
<style lang="stylus">
.emoji
    display inline-flex
    width 1em
    height 1em
</style>