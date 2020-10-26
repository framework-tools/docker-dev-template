<script>
import Board from '@/components/kanban/Board'
import MenuRight from 'icons/MenuRight'
import Story from 'icons/BookOpenPageVariant'
import Emoji from '@/components/Emoji'

export let lane
export let items = []
export let groups = []
export let swimlane

let opened = false

$: swimlaneItems = items.filter(item => item[swimlane] == lane)
</script>
<div class="swimlane">
    <div class="swimlane-group" on:click={() => opened = !opened}>
        <div class="dropdown" class:opened={opened}>
            <MenuRight/> 
        </div>
        <div class="icon">
            <Emoji component={Story}/>
        </div>
        <span class="swimlane-name">
            { lane }
        </span>
    </div>
    {#if opened}
        <Board
            bind:boardItems={swimlaneItems}
            bind:items={items}
            bind:groups={groups}
            bind:swimlane={swimlane}
            bind:lane={lane}/>
    {/if}
</div>
<style lang="stylus">
@import 'stylus/variables'

.swimlane-group
    margin-left -30px
    display grid
    grid-gap 5px
    grid-template-columns min-content min-content
    grid-auto-flow column
    align-items center
    padding 8px
    border-radius 5px
    cursor pointer
    &:hover
        background mix($dark, transparent, 5%)
        .dropdown
            color mix($dark, transparent, 20%)

.icon
    color #2D9CDB
.dropdown
    font-size 24px
    color mix($dark, transparent, 10%)
    display inline-flex
    &.opened
        transform rotate(90deg)
.swimlane-name
    font-weight 500

</style>