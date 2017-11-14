using System;

namespace TodoList.Services
{
  public interface IToDoService
    {
    TodoItem Add(string name);
    }
}
