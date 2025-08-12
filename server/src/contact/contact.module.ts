import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from './entities/contact.entity';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfo])],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [TypeOrmModule],
})
export class ContactModule {}


