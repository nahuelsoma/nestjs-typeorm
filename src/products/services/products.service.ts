import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // import for database connection
import { Repository, Between, FindOptionsWhere } from 'typeorm'; // import for database connection

import { Product } from './../entities/product.entity';
import { Category } from './../entities/category.entity';
import { Brand } from '../entities/brand.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>, // Inject repository
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll(params?: FilterProductsDto) {
    // Use repository to find all info in this table
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        if (maxPrice < minPrice) {
          throw new ConflictException(
            `maxPrice (${maxPrice}) must be higher than minPrice (${minPrice})`,
          );
        }
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: {
        id,
      },
      relations: {
        brand: true, // Show brand in result
        categories: true, // Show categories in result
      },
    }); // Use repository to find a row in this table
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newProduct = new Product();

    // newProduct.name = data.name;  // In this case, each atribute must be written
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;

    const newProduct = this.productRepo.create(data); // In this case, an instance of productRepo is created with all atributes included
    // if brandId, add brand property
    if (data.brandId) {
      const brand = await this.brandRepo.findOneBy({
        id: data.brandId,
      });
      newProduct.brand = brand;
    }

    // if categoriesIds , add categories property
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct); // New product is saved in database
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id }); // Find element to be updated
    // if brandId exist, update product brand
    if (changes.brandId) {
      const brand = await this.brandRepo.findOneBy({
        id: changes.brandId,
      });
      product.brand = brand;
    }

    // if categoriesIds , update categories property
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        changes.categoriesIds,
      );
      product.categories = categories;
    }

    this.productRepo.merge(product, changes); // Merge product with new data, saved in "product" variable
    return this.productRepo.save(product); // Save on database
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    // find product in database
    const product = await this.productRepo.findOne({
      where: {
        id: productId,
      },
      relations: {
        categories: true, // Show categories in result
      },
    });

    // Remove category from product
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );

    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    // find product in database
    const product = await this.productRepo.findOne({
      where: {
        id: productId,
      },
      relations: {
        categories: true, // Show categories in result
        brand: true, // Show brand in result
      },
    });

    // Verify if product exist
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    // find category in database
    const category = await this.categoryRepo.findOneBy({
      id: categoryId,
    });

    // Verify if category exist
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }

    // If product doesnt have category, push category. Else, throw error
    // If product already has category, throw error
    if (!product.categories.find((item) => item.id == categoryId)) {
      product.categories.push(category);
    } else {
      throw new ConflictException(
        `Category #${categoryId} is already present in this product`,
      );
    }

    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
