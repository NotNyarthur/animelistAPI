"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenreSchema = void 0;
const zod_1 = require("zod");
exports.createGenreSchema = zod_1.z.object({
    name: zod_1.z.string().trim(),
});
