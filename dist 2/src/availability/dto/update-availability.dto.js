"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAvailabilityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_availability_dto_1 = require("./create-availability.dto");
class UpdateAvailabilityDto extends (0, swagger_1.PartialType)(create_availability_dto_1.CreateAvailabilityDto) {
}
exports.UpdateAvailabilityDto = UpdateAvailabilityDto;
//# sourceMappingURL=update-availability.dto.js.map