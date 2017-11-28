using System.Collections.Generic;

namespace Todos.Services
{
  public interface ITodosService
  {
    TodoItem Get(int id);

    IList<TodoItem> Get();

    TodoItem Add(string name);

    bool MarkAsDone(int id);
  }
}
