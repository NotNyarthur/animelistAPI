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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenre = exports.getGenreById = exports.createGenre = exports.getAllGenres = void 0;
const genre_schema_1 = require("../schemas/genre.schema");
const zod_1 = require("zod");
const prisma_1 = require("../config/prisma");
const getAllGenres = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = yield prisma_1.prisma.genre.findMany();
        return res.status(200).json(genres);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.getAllGenres = getAllGenres;
const createGenre = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = _req;
        const validatedBody = genre_schema_1.createGenreSchema.parse(body);
        const genre = yield prisma_1.prisma.genre.findFirst({
            where: {
                name: validatedBody.name,
            },
        });
        if (genre) {
            throw new Error("Genre already exists");
        }
        const newGenre = yield prisma_1.prisma.genre.create({
            data: validatedBody,
        });
        return res.status(201).json(newGenre);
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
exports.createGenre = createGenre;
const getGenreById = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genreId = _req.params.genreId;
        const genre = yield prisma_1.prisma.genre.findUnique({
            where: {
                id: parseInt(genreId),
            },
            include: {
                anime: {
                    select: {
                        anime: {
                            select: {
                                id: true,
                                name: true,
                                episodios: true,
                            },
                        },
                    },
                },
            },
        });
        if (!genre) {
            throw new Error("Genre not found");
        }
        return res.status(200).json(genre);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.getGenreById = getGenreById;
const deleteGenre = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genreId = _req.params.genreId;
        const genre = yield prisma_1.prisma.genre.findUnique({
            where: {
                id: parseInt(genreId),
            },
        });
        if (!genre) {
            throw new Error("Genre not found");
        }
        yield prisma_1.prisma.genre.delete({
            where: {
                id: parseInt(genreId),
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
exports.deleteGenre = deleteGenre;
