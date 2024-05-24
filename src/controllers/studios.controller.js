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
exports.deleteStudio = exports.getStudioById = exports.createStudio = exports.getAllStudios = void 0;
const studio_schema_1 = require("../schemas/studio.schema");
const zod_1 = require("zod");
const prisma_1 = require("../config/prisma");
const getAllStudios = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studios = yield prisma_1.prisma.studio.findMany();
        return res.status(200).json(studios);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.getAllStudios = getAllStudios;
const createStudio = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = _req;
        const validatedBody = studio_schema_1.createStudioSchema.parse(body);
        const studio = yield prisma_1.prisma.studio.findFirst({
            where: {
                name: validatedBody.name,
            },
        });
        if (studio) {
            throw new Error("Studio already exists");
        }
        const newStudio = yield prisma_1.prisma.studio.create({
            data: validatedBody,
        });
        return res.status(201).json(newStudio);
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
exports.createStudio = createStudio;
const getStudioById = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studioId = _req.params.studioId;
        const studio = yield prisma_1.prisma.studio.findUnique({
            where: {
                id: parseInt(studioId),
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
        if (!studio) {
            throw new Error("Studio not found");
        }
        return res.status(200).json(studio);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.getStudioById = getStudioById;
const deleteStudio = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studioId = _req.params.studioId;
        const studio = yield prisma_1.prisma.studio.findUnique({
            where: {
                id: parseInt(studioId),
            },
        });
        if (!studio) {
            throw new Error("Studio not found");
        }
        yield prisma_1.prisma.studio.delete({
            where: {
                id: parseInt(studioId),
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
exports.deleteStudio = deleteStudio;
