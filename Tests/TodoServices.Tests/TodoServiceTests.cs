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

    [Fact] // TODO: It violates the BDD
    internal void Get_ByIdThatDoNotExist_ShouldReturnNull()
    {
      // Arrange
      int todoId = 5;

      // Act
      var item = todoService.Get(todoId);

      // Assert
      item.ShouldBeNull();
    }

    [Fact] // TODO: It violates the BDD
    internal void Get_ByIdThatExist_ShouldReturnObject()
    {
      // Arrange
      int todoId = 1;

      // Act
      var item = todoService.Get(todoId);

      // Assert
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
      // Act & Assert
      Action action = () => todoService.Add(newItemName);
      action.ShouldThrow<ArgumentException>();
    }
  }
}
