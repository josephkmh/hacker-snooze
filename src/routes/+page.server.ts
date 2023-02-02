import { HackerNewsApiClient } from '../api';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const apiServer = new HackerNewsApiClient();

	const postIds = await apiServer.getTopStories();

	const posts = Promise.all(postIds.map((postId) => apiServer.getStoryItem(String(postId))));

	return {
		posts
	};
}
