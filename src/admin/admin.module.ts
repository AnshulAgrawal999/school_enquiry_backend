import { Module } from '@nestjs/common';
import { AdminController } from '../controller/admin/admin.controller';
import { AdminService } from '../service/admin/admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../schema/student.schema';
import { RemarkList, RemarkListSchema } from '../schema/remarklist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: RemarkList.name, schema: RemarkListSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
