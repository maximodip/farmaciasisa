import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dbeaver_user',
      password: 'StrongPass123!',  // Asegúrate de usar tu contraseña aquí
      database: 'farmaciasisa',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CustomerModule,
    ProductModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
