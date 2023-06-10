import axios from "axios";
import cheerio from "cheerio";
import ResponseHelper from "../helpers/ResponseHelper.js";

const KUSONIME_URL = "https://kusonime.com";

export default class MainController {
    static getDownloadLinks($, wrapperClass, urlClass, titleClass) {
        const download = { title: '', link_download: [] };
        const element = $(".venser");
        
        $(element).find(wrapperClass).each((index, element) => {
            $(element).find(urlClass).each((i, el) => {
                const temp_dl = [];
                $(el).find("a").each((idx, elm) => {
                    temp_dl.push({ name: $(elm).text(), url: $(elm).attr("href") });
                });
                download.link_download.push({ resolusi: $(el).find("strong").text(), link: temp_dl });
            });
            download.title = $(element).find(titleClass).text();
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
            const response = await axios.get(`${KUSONIME_URL}/page/${page}`);
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
            const response = await axios.get(`${KUSONIME_URL}/${slug}`);
            const $ = cheerio.load(response.data);
            const element = $(".venser");

            const genre = [];
            $(element).find(".info > p:nth-of-type(2) > a").each((i, el) => {
                genre.push({
                    name: $(el).text(),
                    url: $(el).attr("href"),
                    endpoint: $(el).attr("href").replace(KUSONIME_URL, ""),
                });
            });

            let download = {};
            download = MainController.getDownloadLinks($, ".smokeddlrh", ".smokeurlrh", ".smokettlrh");

            if (download.title === '' && download.link_download.length === 0) {
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

    static async getRekomendasi(req, res) {
        try {
            const response = await axios.get(KUSONIME_URL);
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

    static async getGenres(req, res) {
        try {
            const response = await axios.get(`${KUSONIME_URL}/genres`);
            const $ = cheerio.load(response.data);
            const element = $('.venser > .venutama');

            const genres = [];
            $(element).find('ul.genres > li').each((i, el) => {
                genres.push({
                    name: $(el).find('a').text(),
                    endpoint: $(el).find('a').attr('href')?.replace(`${KUSONIME_URL}/genres`, ''),
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
            const response = await axios(`${KUSONIME_URL}/genres/${genre}/page/${page}`);
            const $ = cheerio.load(response.data);
            const anime = MainController.getAnimeList($);

            return ResponseHelper.success(res, 200, anime);
        } catch (err) {
            console.log(err);
            return ResponseHelper.failed(res, 500, err);
        }
    }
}
