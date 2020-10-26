<script>
import Kanban from '@/components/kanban/Kanban'
import App from '@/layouts/App'

let property = 'status'
let properties = {
	'status': {
		'To Do': { color: "#e8e8e8" },
		'Stuck': { color: "#fcc" },
		'In Progress': { color: "#def" },
		'Done': { color: '#ced' }
	},
	'Story': {
		'User Story 1': {},
		'User Story 2': {}
	}
}
let swimlane = 'story'

let items = [
	{ id: 0, status: 'To Do', name: "Task 1", story: 'User Story 1'},
	{ id: 1, status: 'Stuck', name: "Task 2", story: 'User Story 2'}
]
</script>
<App>
	<div class="page-content">
		<Kanban
		bind:groups={properties[property]}
		bind:items={items}
		bind:swimlane={swimlane}
		/>
	</div>
</App>
<style lang="stylus">
	.page-content
		padding 40px
</style>