<script>
import Plus from 'icons/Plus'
import Card from '@/components/kanban/Card'
export let group = []
export let items = []
export let boardItems = []
export let swimlane
export let lane
$: groupItems = boardItems.filter(item => item.status == group.name)

function onDrop (e) {
	let id = e.dataTransfer.getData('text')
	let item = items.find(item => item.id == Number(id))
	item.status = group.name
	item[swimlane] = lane
	items = items
}
	
function addItem (group) {
	items = [
		...items,
		{
			id: items.length,
			status: group.name,
			name: `Task ${items.length + 1}`,
			[swimlane]: lane
		}
	]
}
</script>
<div 
	class="group"
	on:drop={e => onDrop(e)} 
	ondragover="return false">
	<span class="label" style="background: {group.color}">{ group.name }</span>
	<div class="items">
		{#each groupItems as item }
			<Card bind:item={item}/>
		{/each}
		<div class="add-item" on:click={addItem(group)}>
			<Plus/> Add item
		</div>
	</div>
</div>
<style lang="stylus">
.group
	padding 5px
	flex 1 1 0

.label
	padding 2px 4px
	border-radius 4px
	font-weight 500
	display inline-block
	background rgba(0,0,0,0.5)

.items
	padding 10px 0
	display grid

.add-item
	margin 2px 0
	cursor pointer
	padding 10px
	border-radius 4px
	color rgba(0,0,0,0.2)
	font-weight 500
	display grid
	grid-template-columns min-content
	grid-gap 5px
	grid-auto-flow column
	align-items center
	&:hover
		background rgba(0,0,0,0.05)

</style>