<script>
import Group from '@/components/kanban/Group'

export let groups
export let items
export let boardItems
export let swimlane
export let lane

$: groupsArray = Object.entries(groups).map(([key, value]) => ({...value, name: key}))

</script>
<div class="board">
	{#each [...groupsArray] as group}
		<Group
			bind:boardItems={boardItems}
			bind:group={group}
			bind:items={items}
			bind:swimlane={swimlane}
			bind:lane={lane}/>
	{/each}
</div>
<style lang="stylus">
.board 
	display flex
	padding-top 5px
	font-size 14px

</style>