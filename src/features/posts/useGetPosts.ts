import { useEffect, useState } from "react";

import { axiosClient } from "../../api_services/apiService";
import { Result } from "../../types/result";
import { API_PATHS } from "../../api_services/api";

export async function getPosts(signal: AbortSignal): Promise<Result<Post[]>> {
    try {
        const response = await axiosClient.get(API_PATHS.posts, { params: { _limit: 15 }, signal: signal });
        console.log(`response: `, response);
        return { ok: true, data: response.data };
    } catch (err: any) {
        return {
            ok: false, error: err.message ?? "Something went wrong"
        };
    }
}

export interface Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
}

export const useGetPosts = () => {
    const [posts, setPosts] = useState(<Post[]>[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchPosts = async () => {
            const result = await getPosts(controller.signal);
            if (!result.ok) {
                setError(result.error);
                setLoading(false);
                return;
            }

            setPosts(result.data);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    return { posts, loading, error };
};
