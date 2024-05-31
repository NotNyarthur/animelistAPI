"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPicture = exports.deleteAnime = exports.updateAnime = exports.getAnimeById = exports.createAnime = exports.getAllAnime = void 0;
const anime_schema_1 = require("../schemas/anime.schema");
const zod_1 = require("zod");
const prisma_1 = require("../config/prisma");
const streamifier_1 = __importDefault(require("streamifier"));
const cloudinary_1 = require("../config/cloudinary");
const getAllAnime = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animes = yield prisma_1.prisma.anime.findMany({
            select: {
                id: true,
                name: true,
                season: true,
                start_date: true,
                end_date: true,
                format: true,
                episodios: true,
                ep_duration: true,
                englishname: true,
                picture: true,
                synopsis: true,
                japanesename: true,
                studios: {
                    select: {
                        studio: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                genres: {
                    select: {
                        genre: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return res.status(200).json(animes);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.getAllAnime = getAllAnime;
const createAnime = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = _req;
        const validatedBody = anime_schema_1.CreateAnimeSchema.parse(body);
        yield Promise.all(validatedBody.studios.map((studio) => __awaiter(void 0, void 0, void 0, function* () {
            const existingStudio = yield prisma_1.prisma.studio.findUnique({
                where: {
                    id: studio.studioId,
                },
            });
            if (!existingStudio) {
                throw new Error(`Studio ${studio.studioId} not found`);
            }
        })));
        yield Promise.all(validatedBody.genres.map((genre) => __awaiter(void 0, void 0, void 0, function* () {
            const existingGenre = yield prisma_1.prisma.genre.findUnique({
                where: {
                    id: genre.genreId,
                },
            });
            if (!existingGenre) {
                throw new Error(`Genre ${genre.genreId} not found`);
            }
        })));
        const date = zod_1.z.string().date();
        validatedBody.start_date = date.parse(validatedBody.start_date);
        validatedBody.end_date = date.parse(validatedBody.end_date);
        const anime = yield prisma_1.prisma.anime.create({
            data: Object.assign(Object.assign({}, validatedBody), { studios: {
                    create: validatedBody.studios.map((studio) => ({
                        studio: { connect: { id: studio.studioId } },
                    })),
                }, genres: {
                    create: validatedBody.genres.map((genre) => ({
                        genre: { connect: { id: genre.genreId } },
                    })),
                } }),
            include: {
                studios: true,
                genres: true,
            },
        });
        return res.status(201).json(anime);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                errors: error.issues,
            });
        }
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.createAnime = createAnime;
const getAnimeById = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animeId = _req.params.animeId;
        const anime = yield prisma_1.prisma.anime.findUnique({
            where: {
                id: parseInt(animeId),
            },
            select: {
                id: true,
                name: true,
                season: true,
                start_date: true,
                end_date: true,
                format: true,
                episodios: true,
                ep_duration: true,
                englishname: true,
                picture: true,
                synopsis: true,
                japanesename: true,
                studios: {
                    select: {
                        studio: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                genres: {
                    select: {
                        genre: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        if (!anime) {
            throw new Error("Anime not found");
        }
        return res.status(200).json(anime);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.getAnimeById = getAnimeById;
const updateAnime = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animeId = _req.params.animeId;
        const { body } = _req;
        const validatedBody = anime_schema_1.UpdateAnimeSchema.parse(body);
        const anime = yield prisma_1.prisma.anime.findUnique({
            where: {
                id: parseInt(animeId),
            },
        });
        if (!anime) {
            throw new Error("Anime not found");
        }
        const { studios, genres } = validatedBody, animeData = __rest(validatedBody, ["studios", "genres"]);
        const updatedAnime = yield prisma_1.prisma.anime.update({
            where: { id: parseInt(animeId) },
            data: Object.assign(Object.assign({}, animeData), { studios: studios
                    ? {
                        deleteMany: {},
                        create: studios.map((studio) => ({
                            studio: { connect: { id: studio.studioId } },
                        })),
                    }
                    : undefined, genres: genres
                    ? {
                        deleteMany: {},
                        create: genres.map((genre) => ({
                            genre: { connect: { id: genre.genreId } },
                        })),
                    }
                    : undefined }),
        });
        return res.status(200).json(updatedAnime);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                errors: error.issues,
            });
        }
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.updateAnime = updateAnime;
const deleteAnime = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animeId = _req.params.animeId;
        const anime = yield prisma_1.prisma.anime.findUnique({
            where: {
                id: parseInt(animeId),
            },
        });
        if (!anime) {
            throw new Error("Anime not found");
        }
        yield prisma_1.prisma.anime.delete({
            where: {
                id: parseInt(animeId),
            },
        });
        return res.status(204).json({
            message: "Anime deleted successfully",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.deleteAnime = deleteAnime;
const uploadPicture = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file } = _req;
        if (!file) {
            throw new Error("Picture is required");
        }
        const uploadStream = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.cloudinary.uploader.upload_stream({
                    folder: "animelist",
                }, (error, result) => {
                    if (error) {
                        reject(new Error("Error uploading picture"));
                    }
                    else {
                        resolve(result);
                    }
                });
                streamifier_1.default.createReadStream(fileBuffer).pipe(stream);
            });
        };
        const result = yield uploadStream(file.buffer);
        return res.status(201).json({
            picture: result.secure_url,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.uploadPicture = uploadPicture;
