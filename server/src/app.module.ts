import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { OssModule } from './oss/oss.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { getTypeOrmConfig } from './config/database.config';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    AuthModule,
    UserModule,
    ProductsModule,
    CategoryModule,
    OssModule,
    MessageModule,
    ContactModule,
  ],
})
export class AppModule { } 
