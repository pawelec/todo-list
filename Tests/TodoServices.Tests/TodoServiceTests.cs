using Shouldly;
using System;
using System.Linq;
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
    internal void Add_NameIsNull_ShouldThrowArgumentNullException()
    {
      // Act & Assert
      Action action = () => this.todoService.Add(null);
      action.ShouldThrow<ArgumentNullException>();
    }

    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    internal void Add_NameIsNullOrWhiteSpace_ShouldThrowAppropriateException(
      string name)
    {
      // Act & Assert
      Action action = () => this.todoService.Add(name);
      action.ShouldThrow<ArgumentException>();
    }

    [Fact]
    internal void Add_NameIsValid_ShouldReturnNotNullTodoItem()
    {
      // Arrange
      string name = "Test name";
      TodoItem item = null;

      // Act
      item = this.todoService.Add(name);

      // Assert
      item.ShouldNotBeNull();
      item.Name.ShouldBe(name);
    }

    [Fact]
    internal void Add_NameIsValid_NewItemShouldBeAdded()
    {
      // Arrange
      string name = "Test name";
      int actualItemsCount = this.todoService.Get().Count();
      int expectedItemsCount = actualItemsCount + 1;

      // Act
      this.todoService.Add(name);
      actualItemsCount = this.todoService.Get().Count();

      // Assert
      actualItemsCount.ShouldBe(expectedItemsCount);
    }
  }
}
