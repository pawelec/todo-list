using System.Collections.Generic;

namespace TodoList.Services
{
  public interface IToDoService
  {
    TodoItem Get(int id);

    IEnumerable<TodoItem> Get();

    TodoItem Add(string name);
  }
}
