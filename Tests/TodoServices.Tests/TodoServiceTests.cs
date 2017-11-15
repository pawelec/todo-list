using Shouldly;
using System;
using TodoList.Services;
using Xunit;

namespace TodoServices.Tests
{
    public class TodoServiceTests
    {
        [Fact]
        internal void Get_ByIdThatDoNotExist_ShouldReturnNull()
    {
      int todoId = 5;
      TodoItem item = null;
      var service = new TodoService();

      item = service.Get(todoId);

      item.ShouldBeNull();
    }

    [Fact]
    internal void Get_ByIdThatExist_ShouldReturnObject()
    {
      int todoId = 1;
      TodoItem item = null;
      var service = new TodoService();

      item = service.Get(todoId);

      item.ShouldNotBeNull();
      item.Id.ShouldBe(todoId);
    }

    [Fact]
        internal void Add_NullAsName_ShouldThrowArgumentNullException()
        {
          // Arrange
          IToDoService service = new TodoService();
          string newItemName = null;

          // Act & Assert
          Action action = () => service.Add(newItemName);
          action.ShouldThrow<ArgumentNullException>();
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        internal void Add_NameIsEmptyOrWhitespace_ShouldThrowArgumentException(string newItemName)
        {
          // Arrange
          IToDoService service = new TodoService();

          // Act & Assert
          Action action = () => service.Add(newItemName);
          action.ShouldThrow<ArgumentException>();
        }
  }
}
