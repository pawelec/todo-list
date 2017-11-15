namespace TodoList.Services
{
  public interface IToDoService
  {
    TodoItem Get(int id);

    TodoItem Add(string name);
  }
}
