using System;

namespace TodoList.Services
{
  public interface IToDoService
    {
    TodoItem Add(string name);
    }

  public class TodoService : IToDoService
  {
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
  }
}
