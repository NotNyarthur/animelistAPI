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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const prisma_1 = require("../config/prisma");
const user_schema_1 = require("../schemas/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const signup = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const payload = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        };
        const secretkey = process.env.SECRET_KEY;
        if (!secretkey) {
            throw new Error("Secret key not found");
        }
        const accessToken = jsonwebtoken_1.default.sign(payload, secretkey, { expiresIn: "7d" });
        return res.status(201).json({
            access_token: accessToken,
        });
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
exports.signup = signup;
const login = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = _req;
        const validatedBody = user_schema_1.loginSchema.parse(body);
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                username: validatedBody.username,
            },
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const validPass = bcrypt_1.default.compare(validatedBody.password, user.password);
        if (!validPass) {
            throw new Error("Invalid credentials");
        }
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        const secretkey = process.env.SECRET_KEY;
        if (!secretkey) {
            throw new Error("Secret key not found");
        }
        const accessToken = jsonwebtoken_1.default.sign(payload, secretkey, { expiresIn: "7d" });
        return res.status(200).json({
            access_token: accessToken,
        });
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
exports.login = login;
