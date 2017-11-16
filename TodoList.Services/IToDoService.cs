using System.Collections.Generic;

namespace TodoList.Services
{
  public interface IToDoService
  {
    TodoItem Get(int id);

    IList<TodoItem> Get();

    TodoItem Add(string name);

    bool MarkAsDone(int id);
  }
}
