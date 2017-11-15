using Shouldly;
using System;
using TodoList.Services;
using Xunit;

namespace TodoServices.Tests
{
    public class TodoServiceTests : IClassFixture<TodoService>
    {

    private readonly IToDoService todoService;

    public TodoServiceTests(TodoService todoService)
    {
      this.todoService = todoService;
    }

        [Fact]
        internal void Get_ByIdThatDoNotExist_ShouldReturnNull()
    {
      int todoId = 5;
      TodoItem item = null;

      item = todoService.Get(todoId);

      item.ShouldBeNull();
    }

    [Fact]
    internal void Get_ByIdThatExist_ShouldReturnObject()
    {
      int todoId = 1;
      TodoItem item = null;

      item = todoService.Get(todoId);

      item.ShouldNotBeNull();
      item.Id.ShouldBe(todoId);
    }

    [Fact]
        internal void Add_NullAsName_ShouldThrowArgumentNullException()
        {
          // Arrange
          string newItemName = null;

          // Act & Assert
          Action action = () => todoService.Add(newItemName);
          action.ShouldThrow<ArgumentNullException>();
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        internal void Add_NameIsEmptyOrWhitespace_ShouldThrowArgumentException(string newItemName)
        {
          Action action = () => todoService.Add(newItemName);
          action.ShouldThrow<ArgumentException>();
        }
  }
}
