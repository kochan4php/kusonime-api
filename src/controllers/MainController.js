import cheerio from "cheerio";
import axiosInstance from "../config/axiosInstance.js";
import ResponseHelper from "../helpers/ResponseHelper.js";

const KUSONIME_URL = "https://kusonime.com/";

export default class MainController {
    static getDownloadLinks($, wrapperClass, urlClass, titleClass) {
        const element = $(".venser");
            
        const download = [];
        $(element).find(wrapperClass).each((_, element) => {

            const temp_res = [];
            $(element).find(urlClass).each((_, el) => {

                const temp_dl = [];
                $(el).find("a").each((_, elm) => {
                    temp_dl.push({ platform: $(elm).text(), url: $(elm).attr("href") });
                });

                temp_res.push({ resolusi: $(el).find("strong").text(), link: temp_dl });

            });

            download.push({ title: $(element).find(titleClass).text(), link_download: temp_res });

        });

        return download;
    }

    static getAnimeList($) {
        const anime = [];

        $(".venutama").find(".venz ul .kover").each((i, el) => {
            const title = $(el).find(".content > h2 > a").text();
            const release = $(el).find(".content > p").text().trim().split("Genre")[0].trim().split("Admin")[1].trim();
            const genres = $(el).find(".content > p").text().trim().split("Genre")[1].trim().split(", ");
            const link = {
                endpoint: $(el).find(".thumb a").attr("href").replace(KUSONIME_URL, ""),
                url: $(el).find(".thumb a").attr("href"),
                image: $(el).find(".thumb a .thumbz img").attr("src"),
            };

            anime.push({ title, release, genres, link });
        });

        return anime;
    }

    static async getAnimePerPage(req, res) {
        try {
            const page = req.params.page;
            const response = await axiosInstance.get(`/page/${page}`);
            const $ = cheerio.load(response.data);
            const anime = MainController.getAnimeList($);

            return ResponseHelper.success(res, 200, anime);
        } catch (err) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    static async getAnimeDetail(req, res) {
        try {
            const slug = req.params.slug;
            const response = await axiosInstance.get(`/${slug}`);
            const $ = cheerio.load(response.data);
            const element = $(".venser");

            const genre = [];
            $(element).find(".info > p:nth-of-type(2) > a").each((_, el) => {
                genre.push({
                    name: $(el).text(),
                    url: $(el).attr("href"),
                    endpoint: $(el).attr("href").replace(KUSONIME_URL, ""),
                });
            });

            let download = [];
            download = MainController.getDownloadLinks($, ".smokeddlrh", ".smokeurlrh", ".smokettlrh");

            if (download.length === 0) {
                download = MainController.getDownloadLinks($, ".smokeddlrhrh", ".smokeurlrhrh", ".smokettlrhrh");
            }

            const season = {
                name: $(element).find(".lexot .info > p:nth-of-type(3) > a").text(),
                url: $(element).find(".lexot .info > p:nth-of-type(3) > a").attr("href"),
                endpoint: $(element).find(".lexot .info > p:nth-of-type(3) > a").attr("href").replace(KUSONIME_URL, ""),
            };

            const animeDetail = {
                title: $(element).find(".post-thumb img").attr("title"),
                japanase: $(element).find(".lexot .info > p:nth-of-type(1)").text().split(":")[1].trim(),
                image: $(element).find('.post-thumb img').attr('src'),
                producer: $(element).find(".lexot .info > p:nth-of-type(4)").text().split(":")[1].trim(),
                type: $(element).find(".lexot .info > p:nth-of-type(5)").text().split(":")[1].trim(),
                status: $(element).find(".lexot .info > p:nth-of-type(6)").text().split(":")[1].trim(),
                total_episode: $(element).find(".lexot .info > p:nth-of-type(7)").text().split(":")[1].trim(),
                score: `⭐ ${$(element).find(".lexot .info > p:nth-of-type(8)").text().split(":")[1].trim()}`,
                duration: $(element).find(".lexot .info > p:nth-of-type(9)").text().split(":")[1].trim(),
                release_on: $(element).find(".lexot .info > p:nth-of-type(10)").text().split(":")[1].trim(),
                synopsis: $(element).find(".lexot > p:nth-of-type(1)").text().trim(),
                genre,
                season,
                download,
            };

            return ResponseHelper.success(res, 200, animeDetail);
        } catch (err) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    static async getRekomendasi(_, res) {
        try {
            const response = await axiosInstance.get('/');
            const $ = cheerio.load(response.data);
            const element = $('.rekomf');
            
            const rekomendAnime = [];
            $(element).find('.recomx > ul > li').each((i, el) => {
                rekomendAnime.push({
                    title: $(el).find('.zeeb > a > img').attr('title'),
                    endpoint: $(el).find('.zeeb > a').attr('href').replace(KUSONIME_URL, ''),
                    image: $(el).find('.zeeb > a > img').attr('src'),
                    url: $(el).find('.zeeb > a').attr('href')
                });
            });

            return ResponseHelper.success(res, 200, rekomendAnime);
        } catch (err) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    static async getGenres(_, res) {
        try {
            const response = await axiosInstance.get('/genres');
            const $ = cheerio.load(response.data);
            const element = $('.venser > .venutama');

            const genres = [];
            $(element).find('ul.genres > li').each((i, el) => {
                genres.push({
                    name: $(el).find('a').text(),
                    endpoint: $(el).find('a').attr('href')?.replace(KUSONIME_URL, ''),
                    url: $(el).find('a').attr('href')
                });
            });

            genres.splice(0, 1);
            return ResponseHelper.success(res, 200, genres);
        } catch (err) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    static async getAnimeByGenres(req, res) {
        try {
            const { genre, page } = req.params;
            const response = await axiosInstance.get(`/genres/${genre}/page/${page}`);
            const $ = cheerio.load(response.data);
            const anime = MainController.getAnimeList($);

            return ResponseHelper.success(res, 200, anime);
        } catch (err) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    static async getSeasons(_, res) {
        try {
            const response = await axiosInstance.get('/seasons-list');
            const $ = cheerio.load(response.data);
            const element = $('.venser > .venutama');

            const seasons = [];
            $(element).find('ul.genres > li').each((i, el) => {
                seasons.push({
                    name: $(el).find('a').text(),
                    endpoint: $(el).find('a').attr('href')?.replace(KUSONIME_URL, ''),
                    url: $(el).find('a').attr('href')
                });
            });

            seasons.splice(0, 1);
            return ResponseHelper.success(res, 200, seasons);
        } catch (err) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }


    static async getAnimeBySeasons(req, res) {
        try {
            const { season, page } = req.params;
            const response = await axiosInstance.get(`/seasons/${season}/page/${page}`);
            const $ = cheerio.load(response.data);
            const anime = MainController.getAnimeList($);

            return ResponseHelper.success(res, 200, anime);
        } catch (err) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }

    static async searchAnime(req, res) {
        try {
            const response = await axiosInstance.get(`/?s=${req.params.query}&post_type=post`);
            const $ = cheerio.load(response.data);
            const anime = MainController.getAnimeList($);

            return ResponseHelper.success(res, 200, anime);
        } catch (err) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }
}
