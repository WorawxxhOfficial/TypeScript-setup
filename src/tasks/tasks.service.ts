import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.types';

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

  create(title: string): Task {
    const task: Task = {
      id: Date.now().toString(),
      title,
      status: 'OPEN',
    };
    this.tasks.push(task);
    return task;
  }

  update(id: string, status?: TaskStatus, title?: string): Task {
    const task = this.findOne(id);
    if (status) {
      task.status = status;
    }
    if (title !== undefined) {
      task.title = title;
    }
    return task;
  }

  remove(id: string): void {
    const found = this.findOne(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}