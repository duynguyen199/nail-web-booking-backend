"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NailTechProfileModule = void 0;
const common_1 = require("@nestjs/common");
const nail_tech_profile_controller_1 = require("./nail-tech-profile.controller");
const nail_tech_profile_service_1 = require("./nail-tech-profile.service");
const prisma_module_1 = require("../prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const roles_guard_1 = require("../auth/roles.guard");
let NailTechProfileModule = class NailTechProfileModule {
};
exports.NailTechProfileModule = NailTechProfileModule;
exports.NailTechProfileModule = NailTechProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || "your_jwt_secret",
                signOptions: { expiresIn: "1h" }
            })],
        controllers: [nail_tech_profile_controller_1.NailTechProfileController],
        providers: [nail_tech_profile_service_1.NailTechProfileService, roles_guard_1.RolesGuard]
    })
], NailTechProfileModule);
//# sourceMappingURL=nail-tech-profile.module.js.map