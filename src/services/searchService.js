
import  tmdbApi  from '../utils/tmdbApi.js';

class SearchService {
    async searchMoviesByName(body) {
        const { name, page } = body;
        if (!name) {
            throw new Error("El nombre de la película es requerido");
        }
        return await tmdbApi.searchMovies(name, page)
    }

    async searchSeriesByName(body) {
        const { name, page } = body;
        if (!name) {
            throw new Error("El nombre de la serie es requerido");
        }
        return await tmdbApi.searchSeries(name, page)
    }
}
export default new SearchService();