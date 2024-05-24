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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const prisma_1 = require("../config/prisma");
const user_schema_1 = require("../schemas/user.schema");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.prisma.user.findMany();
        return res.status(200).json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = _req;
        const validatedBody = user_schema_1.createUserSchema.parse(body);
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                email: validatedBody.email,
            },
        });
        if (user) {
            throw new Error("Username already exists");
        }
        validatedBody.password = yield bcrypt_1.default.hash(validatedBody.password, 10);
        const newUser = yield prisma_1.prisma.user.create({
            data: validatedBody,
        });
        const { password } = newUser, userData = __rest(newUser, ["password"]);
        return res.status(201).json(userData);
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
exports.createUser = createUser;
const getUserById = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = _req.params.userId;
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
            select: {
                id: true,
                username: true,
            },
        });
        if (!user) {
            throw new Error("Username not found");
        }
        return res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                errors: error.message,
            });
        }
    }
});
exports.getUserById = getUserById;
const updateUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = _req.params.userId;
        const { body } = _req;
        const validatedBody = user_schema_1.updateUserSchema.parse(body);
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (validatedBody.password) {
            validatedBody.password = yield bcrypt_1.default.hash(validatedBody.password, 10);
        }
        let updatedUser = yield prisma_1.prisma.user.update({
            where: {
                id: parseInt(userId),
            },
            data: validatedBody,
        });
        const { password } = updatedUser, userData = __rest(updatedUser, ["password"]);
        return res.status(200).json(userData);
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
exports.updateUser = updateUser;
const deleteUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = _req.params.userId;
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        yield prisma_1.prisma.user.delete({
            where: {
                id: parseInt(userId),
            },
        });
        return res.status(204).json({
            message: "User deleted successfully",
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
exports.deleteUser = deleteUser;
