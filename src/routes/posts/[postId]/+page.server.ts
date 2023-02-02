import { HackerNewsApiClient } from '../../../api';

interface PostPageParams {
	postId: string;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }: { params: PostPageParams }) {
	const { postId } = params;

	const apiServer = new HackerNewsApiClient();

	const post = await apiServer.getStoryItem(postId);

	const comments = Promise.all(
		post.kids?.map((commentId) => apiServer.getComment(String(commentId))) || []
	);

	return {
		post,
		comments
	};
}
