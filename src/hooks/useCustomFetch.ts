// src/hooks/useCustomFetch.ts
import axios from "axios";
import { useState, useEffect } from "react";

interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    isLoading: boolean;
};

function useCustomFetch<T>(url: string): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get<T>(url, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                    },
                });
                setData(data);
            } catch (err) {
                console.error('정보를 불러오는 데 실패했습니다.', err);
                setError('정보를 불러오는 데 실패했어요. 다시 시도해 주세요.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, isLoading, error };
}

export default useCustomFetch;