import { cache } from '../cache';

interface GetTopStoriesParams {
	limit?: number;
}

interface Item {
	id: number;
	type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
	deleted?: boolean;
	by?: string;
}

interface CommentItem extends Item {
	type: 'comment';
	kids?: number[];
	parent?: number;
	text?: string;
	time?: 1314211127;
	deleted?: boolean;
}

interface StoryItem extends Item {
	type: 'story';
	time?: number;
	dead?: boolean;
	kids?: number[];
	text?: string;
	url?: string;
	title?: string;
	score?: number;
}

export class HackerNewsApiClient {
	BASE_URL = `https://hacker-news.firebaseio.com/v0`;

	fetch<T>(url: string): Promise<T> {
		return fetch(url).then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			} else {
				return response.json() as Promise<T>;
			}
		});
	}

	getTopStories(params: GetTopStoriesParams = { limit: 20 }): Promise<number[]> {
		return this.fetch<number[]>(`${this.BASE_URL}/topstories.json`).then(async (data) => {
			return data.slice(0, params?.limit);
		});
	}

	getItem<T>(id: string): Promise<T> {
		const cacheHit = cache.get(id);
		if (cacheHit) {
			return Promise.resolve(cacheHit as T);
		} else {
			const item = this.fetch<T>(`${this.BASE_URL}/item/${id}.json`);
			cache.set(id, item);
			return item;
		}
	}

	getStoryItem(id: string): Promise<StoryItem> {
		return this.getItem<StoryItem>(id);
	}

	getComment(id: string): Promise<CommentItem> {
		return this.getItem<CommentItem>(id);
	}
}
