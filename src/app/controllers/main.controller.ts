/**
 * @description - This file contain a main controller for kusonime api endpoints
 * @author {Deo Sbrn}
 */

import cheerio, { CheerioAPI } from 'cheerio';
import { Request, Response } from 'express';
import kusonime from '../../config/kusonime';
import ResponseHelper from '../helpers/response.helper';
import { AnimeType, DownloadLinkType, DownloadType, GenreType, PlatformType, RekomendasiType, SeasonType } from '../interfaces';

const KUSONIME_URL = 'https://kusonime.com/';

export default class MainController {
    public static getDownloadLinks($: CheerioAPI, wrapperClass: string, urlClass: string, titleClass: string) {
        const element = $('.venser');

        const download: DownloadType[] = [];
        $(element)
            .find(wrapperClass)
            .each((_, element) => {
                const temp_res: DownloadLinkType[] = [];
                $(element)
                    .find(urlClass)
                    .each((_, el) => {
                        const temp_dl: PlatformType[] = [];
                        $(el)
                            .find('a')
                            .each((_, elm) => {
                                temp_dl.push({
                                    platform: $(elm).text(),
                                    url: $(elm).attr('href'),
                                });
                            });

                        temp_res.push({
                            resolusi: $(el).find('strong').text(),
                            link: temp_dl,
                        });
                    });

                download.push({
                    title: $(element).find(titleClass).text(),
                    link_download: temp_res,
                });
            });

        return download;
    }

    public static formatAnimeData($: CheerioAPI): AnimeType[] {
        const anime: AnimeType[] = [];
        const element = $('.venutama');

        $(element)
            .find('.venz ul .kover')
            .each((_, el) => {
                const title = $(el).find('.content > h2 > a').text();
                const release = $(el).find('.content > p').text().trim().split('Genre')[0].trim().split('Admin')[1].trim();
                const genres = $(el).find('.content > p').text().trim().split('Genre')[1].trim().split(', ');
                const link = {
                    endpoint: $(el).find('.thumb a').attr('href')?.replace(KUSONIME_URL, ''),
                    url: $(el).find('.thumb a').attr('href'),
                    image: $(el).find('.thumb a .thumbz img').attr('src'),
                };

                anime.push({ title, release, genres, link });
            });

        return anime;
    }

    public static async getAnimePerPage(req: Request, res: Response) {
        try {
            const page = req.params.page;
            const response = await kusonime.get(`/page/${page}`);
            const $ = cheerio.load(response.data);
            const anime = MainController.formatAnimeData($);

            const element = $('.venutama');
            const current_page = Number($(element).find('.pagination .wp-pagenavi .current').text());
            const total_page = Number($(element).find('.pagination .wp-pagenavi .pages').text().split('of')[1].trim());

            const pagination = {
                first_page_endpoint: 'page/1',
                next_page_endpoint: current_page === total_page ? null : `page/${current_page + 1}`,
                current_page,
                pages_of: $(element).find('.pagination .wp-pagenavi .pages').text(),
                total_page,
                prev_page_endpoint: current_page > 1 ? `page/${current_page - 1}` : null,
                last_page_endpoint: `page/${total_page}`,
            };

            return ResponseHelper.success(res, 200, { anime, pagination });
        } catch (err: any) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    public static async getAnimeDetail(req: Request, res: Response) {
        try {
            const slug = req.params.slug;
            const response = await kusonime.get(`/${slug}`);
            const $ = cheerio.load(response.data);
            const element = $('.venser');

            const genre: { name: string; url: string | undefined; endpoint: string | undefined }[] = [];
            $(element)
                .find('.info > p:nth-of-type(2) > a')
                .each((_, el) => {
                    genre.push({
                        name: $(el).text(),
                        url: $(el).attr('href'),
                        endpoint: $(el)?.attr('href')?.replace(KUSONIME_URL, ''),
                    });
                });

            let download = [];
            download = MainController.getDownloadLinks($, '.smokeddlrh', '.smokeurlrh', '.smokettlrh');

            if (download.length === 0) {
                download = MainController.getDownloadLinks($, '.smokeddlrhrh', '.smokeurlrhrh', '.smokettlrhrh');

                if (download.length === 0) {
                    download = MainController.getDownloadLinks($, '.smokeddl', '.smokeurl', '.smokettl');
                }
            }

            download = download.filter((element) => element.link_download.length > 0 && element.title !== '');

            const season = {
                name: $(element).find('.lexot .info > p:nth-of-type(3) > a').text(),
                url: $(element).find('.lexot .info > p:nth-of-type(3) > a').attr('href'),
                endpoint: $(element).find('.lexot .info > p:nth-of-type(3) > a').attr('href')?.replace(KUSONIME_URL, ''),
            };

            const animeDetail = {
                title: $(element).find('.post-thumb img').attr('title'),
                japanase: $(element).find('.lexot .info > p:nth-of-type(1)').text().split(':')[1].trim(),
                image: $(element).find('.post-thumb img').attr('src'),
                producer: $(element).find('.lexot .info > p:nth-of-type(4)').text().split(':')[1].trim(),
                type: $(element).find('.lexot .info > p:nth-of-type(5)').text().split(':')[1].trim(),
                status: $(element).find('.lexot .info > p:nth-of-type(6)').text().split(':')[1].trim(),
                total_episode: $(element).find('.lexot .info > p:nth-of-type(7)').text().split(':')[1].trim(),
                score: `⭐ ${$(element).find('.lexot .info > p:nth-of-type(8)').text().split(':')[1].trim()}`,
                duration: $(element).find('.lexot .info > p:nth-of-type(9)').text().split(':')[1].trim(),
                release_on: $(element).find('.lexot .info > p:nth-of-type(10)').text().split(':')[1].trim(),
                synopsis: $(element).find('.lexot > p:nth-of-type(1)').text().trim(),
                genre,
                season,
                download,
            };

            return ResponseHelper.success(res, 200, animeDetail);
        } catch (err: any) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    public static async getRekomendasi(_: Request, res: Response) {
        try {
            const response = await kusonime.get('/');
            const $ = cheerio.load(response.data);
            const element = $('.rekomf');

            const rekomendAnime: RekomendasiType[] = [];
            $(element)
                .find('.recomx > ul > li')
                .each((i, el) => {
                    rekomendAnime.push({
                        title: $(el).find('.zeeb > a > img').attr('title'),
                        endpoint: $(el).find('.zeeb > a').attr('href')?.replace(KUSONIME_URL, ''),
                        image: $(el).find('.zeeb > a > img').attr('src'),
                        url: $(el).find('.zeeb > a').attr('href'),
                    });
                });

            return ResponseHelper.success(res, 200, rekomendAnime);
        } catch (err: any) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    public static async getGenres(_: Request, res: Response) {
        try {
            const response = await kusonime.get('/genres');
            const $ = cheerio.load(response.data);
            const element = $('.venser > .venutama');

            const genres: GenreType[] = [];
            $(element)
                .find('ul.genres > li')
                .each((i, el) => {
                    genres.push({
                        name: $(el).find('a').text(),
                        endpoint: $(el).find('a').attr('href')?.replace(KUSONIME_URL, ''),
                        url: $(el).find('a').attr('href'),
                    });
                });

            genres.splice(0, 1);
            return ResponseHelper.success(res, 200, genres);
        } catch (err: any) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    public static async getAnimeByGenres(req: Request, res: Response) {
        try {
            const { genre, page } = req.params;
            const response = await kusonime.get(`/genres/${genre}/page/${page}`);
            const $ = cheerio.load(response.data);
            const anime = MainController.formatAnimeData($);

            return ResponseHelper.success(res, 200, anime);
        } catch (err: any) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    public static async getSeasons(_: Request, res: Response) {
        try {
            const response = await kusonime.get('/seasons-list');
            const $ = cheerio.load(response.data);
            const element = $('.venser > .venutama');

            const seasons: SeasonType[] = [];
            $(element)
                .find('ul.genres > li')
                .each((i, el) => {
                    seasons.push({
                        name: $(el).find('a').text(),
                        endpoint: $(el).find('a').attr('href')?.replace(KUSONIME_URL, ''),
                        url: $(el).find('a').attr('href'),
                    });
                });

            seasons.splice(0, 1);
            return ResponseHelper.success(res, 200, seasons);
        } catch (err: any) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    public static async getAnimeBySeasons(req: Request, res: Response) {
        try {
            const { season, page } = req.params;
            const response = await kusonime.get(`/seasons/${season}/page/${page}`);
            const $ = cheerio.load(response.data);
            const anime = MainController.formatAnimeData($);

            return ResponseHelper.success(res, 200, anime);
        } catch (err: any) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    public static async searchAnime(req: Request, res: Response) {
        try {
            const response = await kusonime.get(`/?s=${req.params.query}&post_type=post`);
            const $ = cheerio.load(response.data);
            const anime = MainController.formatAnimeData($);

            return ResponseHelper.success(res, 200, anime);
        } catch (err: any) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }
}
