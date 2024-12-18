import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { categories } from '@prisma/client';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get()
  @SkipThrottle()
  async getAllCategories(): Promise<any> {
    const categories = await this.categoriesService.findAll();

    if (categories.length === 0) {
      return {
        statusCode: 404,
        message: 'No categories added yet.',
        categories: categories,
      };
    }

    return {
      statusCode: 200,
      message: 'Categories fetched successfully.',
      categories: categories,
    };
  }

  @Post('create-category')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superadmin', 'admin', 'moderator')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<categories | any> {
    return this.categoriesService.create(createCategoryDto);
  }
}
