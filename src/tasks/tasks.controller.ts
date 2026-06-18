import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.types';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description?: string,
  ): Task {
    return this.tasksService.create(title, description);
  }

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('status') status?: TaskStatus,
    @Body('title') title?: string,
    @Body('description') description?: string,
  ): Task {
    return this.tasksService.update(id, status, title, description);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    this.tasksService.remove(id);
    return { message: 'Task deleted successfully' };
  }
}