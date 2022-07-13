import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // import for database connection
import { Repository } from 'typeorm'; // import for database connection

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>, // Inject repository
  ) {}

  findAll() {
    return this.productRepo.find(); // Use repository to find all info in this table
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id }); // Use repository to find a row in this table
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    // const newProduct = new Product();

    // newProduct.name = data.name;  // In this case, each atribute must be written
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;

    const newProduct = this.productRepo.create(data); // In this case, an instance of productRepo is created with all atributes included

    return this.productRepo.save(newProduct); // New product is saved in database
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id }); // Find element to be updated
    this.productRepo.merge(product, changes); // Merge product with new data, saved in "product" variable
    return this.productRepo.save(product); // Save on database
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
