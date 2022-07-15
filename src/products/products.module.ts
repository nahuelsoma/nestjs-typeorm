import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Used to connect Nest with Postgres via TypeORM

import { ProductsController } from './controllers/products.controller'; // First: import controller
import { ProductsService } from './services/products.service'; // Second: import service
import { Product } from './entities/product.entity'; // Third: import entity

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brand.entity'; // Third: import entity

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])], // Include entitites managed by TypeORM
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
