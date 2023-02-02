<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>Hacker Snooze</h1>
<p>A shameless copy of <a href="https://news.ycombinator.com">news.ycombinator.com</a></p>

<ol class="posts">
	{#each data.posts as post}
		<li class="post">
			{#if post.score !== undefined}
				<span class="post__score">{post.score}</span>
			{/if}
			<a href={post.url} class="post__link">
				{post.title}
			</a>
			<a href={`/posts/${post.id}`} class="post__comment-link"
				>{post.kids?.length || '0'} comments</a
			>
		</li>
	{/each}
</ol>

<style lang="scss">
	.posts {
		margin-inline: auto;
		max-width: 62rem;
	}

	.post {
		margin-block-start: 1rem;
		list-style: none;
		position: relative;

		&__score {
			position: absolute;
			left: 0;
			transform: translateX(calc(-100% - 1rem));
			color: var(--color-gray-200);
			height: 100%;
			display: flex;
			align-items: center;
		}

		&__link {
			font-size: var(--font-size-lg);
			text-underline-offset: 2px;
			display: block;
		}

		&__comment-link {
			font-size: var(--font-size-sm);
			display: block;
			margin-top: 0.5rem;
			color: var(--color-gray-200);
		}
	}
</style>
