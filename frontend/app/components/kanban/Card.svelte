<script>
import { tick } from 'svelte'
export let item
let editing = false
let title

function updateItem (event) {
    item.name = event.target.textContent
}

function setEndOfContenteditable (el) {
    if (document.createRange) {
        let range = document.createRange()//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(el)//Select the entire contents of the element with the range
        range.collapse(false)//collapse the range to the end point. false means collapse to end rather than the start
        let selection = window.getSelection()//get the selection object (allows you to change selection)
        selection.removeAllRanges()//remove any selections already made
        selection.addRange(range)//make the range you have just created the visible selection
    }
}

</script>
<div
	class="card"
	draggable="true"
	on:click={async () => {
		if(editing === true) {
			return
		}
		editing = true
		title.focus()
		await tick()
		setEndOfContenteditable(title)
	}}
	on:dragstart={e => e.dataTransfer.setData('text/plain', item.id)}>
	<span
		class="title"
		bind:this={title}
		contenteditable={ editing }
		on:input={updateItem}
		on:blur={() => editing = false }>
		{item.name}
	</span>
</div>
<style>
	
	.title {
		font-weight: 500;
		outline: 0;
	}
	.card {
		cursor: pointer;
		padding: 8px;
		margin: 2px 0;
		border: 1px solid rgba(0,0,0,0.05);
		background: white;
		border-radius: 4px;
		box-shadow: 0 2px 8px -2px rgba(0,0,0,0.1);
		font-size: 14px;
	}
</style>