import { IsNotEmpty, IsString, MaxLength, MinLength, IsOptional, IsIn, IsISO8601 } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['todo', 'doing', 'done'])
  status?: 'todo' | 'doing' | 'done';

  @IsOptional()
  @IsISO8601()
  dueDate?: string;
}