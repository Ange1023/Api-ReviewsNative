import { AppError } from "./appError.js";


class TmdbApi {
    constructor() {
        this.apiKey = process.env.TMDB_API_KEY;
        this.baseUrl = process.env.TMDB_API_URL;
        this.language = process.env.TMDB_API_LANGUAGE;
    }

    async fetchFromTmdb(endpoint, params = {}) {
        const url = new URL(this.baseUrl + endpoint);

        params.language = this.language;

        Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, value);
        }
        });

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.apiKey}`, 
            }
        });

        if (!res.ok) {
        throw new AppError(`Error fetching data from TMDB`, 500, res.statusText);
        }
        return res.json();
    }

    async searchMovies(query, page = 1) {
        
        if (!query) throw new AppError('Query is required',400);
        return this.fetchFromTmdb('/search/movie', { query, page });
    }

    async searchSeries(query, page = 1) {
        if (!query) throw new AppError('Query is required',400);
        return this.fetchFromTmdb('/search/tv', { query, page});
    }
}

export default new TmdbApi();