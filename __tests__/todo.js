/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "new todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("should return overdue items", () => {
    expect(overdue.length).toEqual(0);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "overdue item 1",
      completed: false,
      dueDate: new Date(today.getTime() - oneDay).toLocaleDateString("en-CA"),
    });
    let overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
  });
  test("Should return items due today", () => {
    expect(dueToday.length).toEqual(0);
    const today = new Date();
    add({
      title: "Due today item 3", //other 2 items are coming from "beforeAll" and "add a new todo" test case
      completed: false,
      dueDate: new Date(today.getTime()).toLocaleDateString("en-CA"),
    });
    let dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(3);
  });
  test("Should return items due later", () => {
    expect(dueLater.length).toEqual(0);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "due later item 1",
      completed: false,
      dueDate: new Date(today.getTime() + 1 * oneDay).toLocaleString("en-CA"),
    });
    let dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(1);
  });
});
