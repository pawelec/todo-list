using System;
using System.Collections.Generic;
using System.Linq;

namespace TodoList.Services
{
  public class TodoService : IToDoService
  {
    private static IList<TodoItem> todos;

    static TodoService()
    {
      todos = new List<TodoItem>();
    }

    public TodoItem Get(int id) => todos.FirstOrDefault(todoItem => todoItem.Id == id);

    public IList<TodoItem> Get() => todos;

    public TodoItem Add(string name)
    {
      if (name == null)
      {
        throw new ArgumentNullException(nameof(name));
      }

      if (string.IsNullOrWhiteSpace(name))
      {
        throw new ArgumentException("Argument can not be blank", nameof(name));
      }

      var todoItem = new TodoItem
      {
        Id = todos.Count() + 1,
        Name = name
      };
      todos.Add(todoItem);

      return todoItem;
    }
  }
}
