"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudioSchema = void 0;
const zod_1 = require("zod");
exports.createStudioSchema = zod_1.z.object({
    name: zod_1.z.string().trim(),
});
