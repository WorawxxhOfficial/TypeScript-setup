import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.types';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  createTask(title: string): Task {
    const task: Task = {
      id: Date.now().toString(),
      title,
      status: 'OPEN',
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, status?: TaskStatus, title?: string): Task {
    const task = this.getTaskById(id);
    if (status) {
      task.status = status;
    }
    if (title !== undefined) {
      task.title = title;
    }
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}