import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.types';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  createTask(@Body('title') title: string): Task {
    return this.tasksService.createTask(title);
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body('status') status?: TaskStatus,
    @Body('title') title?: string,
  ): Task {
    return this.tasksService.updateTask(id, status, title);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): { message: string } {
    this.tasksService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }
}