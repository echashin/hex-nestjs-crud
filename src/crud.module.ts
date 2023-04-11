import { Module } from "@nestjs/common";

import { ImportExportService } from "./services/import-export.service";

@Module({
  imports: [],
  providers: [ImportExportService],
  exports: [ImportExportService],
})
export class CrudModule {}
