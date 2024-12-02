import { Module } from '@nestjs/common';
import { AdminController } from '../controller/admin/admin.controller';
import { AdminService } from '../service/admin/admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../schema/student.schema';
import { RemarkList, RemarkListSchema } from '../schema/remarklist.schema';
import { Admin, AdminSchema } from 'src/schema/admin.schema';
import { BlackList, BlackListSchema } from 'src/schema/blacklist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Admin.name , schema: AdminSchema } ,
      { name: BlackList.name, schema: BlackListSchema } ,
      { name: RemarkList.name, schema: RemarkListSchema }
    ]),
  ],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
