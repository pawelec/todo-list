using System;
using System.Collections.Generic;
using System.Linq;

namespace TodoList.Services
{
  public class TodoService : IToDoService
  {
    private IEnumerable<TodoItem> todos = new List<TodoItem>
    {
      new TodoItem { Id = 1, Name = "Test name" }
    };

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

      throw new NotImplementedException();
    }

    public TodoItem Get(int id) => this.todos.FirstOrDefault(todoItem => todoItem.Id == id);
  }
}
