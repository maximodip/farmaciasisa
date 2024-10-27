import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }
}
