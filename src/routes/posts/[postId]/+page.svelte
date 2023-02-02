<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<a href="/">&lt; Back</a>
<h1>{data.post.title}</h1>
{#if data.post.text}
	{@html data.post.text}
{/if}
{#each data.comments as comment}
	{#if !comment.deleted}
		<div class="comment">
			<span>{comment.by}</span>
			{#if comment.time}<span
					>{new Intl.DateTimeFormat('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric',
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					}).format(new Date(comment.time * 1000))}</span
				>{/if}
			<p>{@html comment.text}</p>
		</div>
	{/if}
{/each}
{console.log(data.comments)}

<style>
	.comment {
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 2px solid rgb(40, 40, 40);
	}
</style>
