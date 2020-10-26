<script>
import Board from '@/components/kanban/Board'
import Swimlane from '@/components/kanban/Swimlane'

export let groups = []
export let items = []
export let swimlane

$: swimlanes = new Set(items.map(item => item[swimlane]).filter(item => item))

</script>
<div class="kanban">
    {#if !swimlane}
        <Board bind:items={items} bind:groups={groups}/>
    {/if}
    {#if swimlane}
        {#each [...swimlanes] as lane}
            <Swimlane bind:items={items} bind:groups={groups} bind:lane={lane} bind:swimlane={swimlane}/>
        {/each}
    {/if}
</div>
<style lang="stylus">
.kanban 
    display flex
    flex-direction column
    font-size 14px

</style>