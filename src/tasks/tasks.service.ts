import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.types';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description, status, dueDate } = createTaskDto;
    const task: Task = {
      id: Date.now().toString(),
      title,
      status: status || 'todo',
    };
    if (description !== undefined) {
      task.description = description;
    }
    if (dueDate !== undefined) {
      task.dueDate = dueDate;
    }
    this.tasks.push(task);
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    const { title, status, description, dueDate } = updateTaskDto;
    
    if (status !== undefined) {
      task.status = status;
    }
    if (title !== undefined) {
      task.title = title;
    }
    if (description !== undefined) {
      task.description = description;
    }
    if (dueDate !== undefined) {
      task.dueDate = dueDate;
    }
    return task;
  }

  remove(id: string): void {
    const found = this.findOne(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}