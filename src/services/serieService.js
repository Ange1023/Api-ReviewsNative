import serieModel from '../models/serie.js';
import categoryModel from '../schemas/category.js';
import mediaIdModel from '../models/mediaId.js';
import  tmdbApi  from '../utils/tmdbApi.js';
import { AppError } from '../utils/appError.js';

class SerieService {

    async createSerie(serieData) {
        return await serieModel.create(serieData);
    }

    async deleteSerie(serieId) {
        return await serieModel.delete(serieId);
    }

    async getAllSeries() {
        return await serieModel.findAll();
        
    }

    async getSerieById(serieId) {
        return await serieModel.findById(serieId);
    }

    async getSerieByTmdbId(tmdbId) {

        let serieId = await mediaIdModel.findOne({ tmdb_id: tmdbId, media_type: 'serie' });

        if (!serieId) {

            const tmdbSerie = await tmdbApi.getSerieDetails(tmdbId);

            if (!tmdbSerie) throw new AppError("No se encontró la serie en TMDB", 404);

            await mediaIdModel.create({tmdb_id: tmdbId, media_type: 'serie'})

            const categoriesData = await categoryModel.find({ tmdb_id: { $in: tmdbSerie.genres.map(genre => genre.id) } }).select('_id');

            if (categoriesData.length === 0) throw new AppError("No se encontraron categorías para la serie", 404);
            
            
            const serieData = {
                tmdb_id: tmdbSerie.id,
                title: tmdbSerie.name,
                synopsis: tmdbSerie.overview,
                first_air_date: tmdbSerie.first_air_date,
                last_air_date: tmdbSerie.last_air_date,
                episodes_count: tmdbSerie.number_of_episodes,
                seasons_count: tmdbSerie.number_of_seasons,
                poster_path: tmdbSerie.poster_path || tmdbSerie.backdrop_path,
                categories: categoriesData,
                cast: tmdbSerie.created_by.map(person => ({
                    name: person.name,
                    role: 'Creator',
                })),
                user_rating: 0,
                critic_rating: 0,
                total_rating: 0,
            };

            await serieModel.create(serieData);

            serieId = await mediaIdModel.findOne({ tmdb_id: tmdbSerie.id, media_type: 'serie' });
        }
        const serie = await serieModel.findOne({ tmdb_id: serieId.tmdb_id  })
        if (!serie) throw new AppError("No se encontró la serie en la base de datos", 404);
        await serie.populate('categories', 'name');
        return serie;
    }
    async paginateSeries(filter = {}, options = { currentPage: 1, limit: 10 }) {
            
        const data = await serieModel.paginate(filter, options);
        return data;
    }


}

export default new SerieService();