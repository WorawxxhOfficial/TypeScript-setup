import { Task } from './task.types';

const myTask: Task = {
    id: '1',
    title: 'เขียนโค้ด NestJS',
    status: 'OPEN',
};

// ❌ Error: ขาด property 'status'
const myTask2: Task = {
    id: '2',
    title: 'ลืมใส่ Status',
};

// ❌ Error: Type '"DOING"' is not assignable to type 'TaskStatus'.
const myTask3: Task = {
    id: '3',
    title: 'ใส่ Status ผิด',
    status: 'DOING', // เพราะเราล็อคไว้แค่ 3 คำ DOING จึงพัง
};