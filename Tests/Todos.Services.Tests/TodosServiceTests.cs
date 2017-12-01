using Shouldly;
using System;
using System.Linq;
using Todos.Services;
using Xunit;

namespace Todos.Services.Tests
{
  public class TodosServiceTests : IClassFixture<TodosService>
  {
    private readonly ITodosService todoService;

    public TodosServiceTests(TodosService todoService)
    {
      this.todoService = todoService;
    }

    [Fact]
    internal void Get_IdThatDoNotExist_ShouldReturnNull()
    {
      // Arrange
      int id = int.MinValue;
      TodoItem item = null;

      // Act
      item = this.todoService.Get(id);

      // Assert
      item.ShouldBeNull();
    }

    [Fact]
    internal void Get_IdThatExist_ShouldReturnItem()
    {
      // It violates BDD.
      // Arrange
      int id = 1;
      todoService.Add("Test");
      TodoItem item = null;

      // Act
      item = this.todoService.Get(id);

      // Assert
      item.ShouldNotBeNull();
      item.Id.ShouldBe(id);
    }

    [Fact]
    internal void Get_NoParams_ShouldReturnListOfItems()
    {
      // Act
      var items = this.todoService.Get();

      // Assert
      items.ShouldNotBeNull();
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

    [Fact]
    internal void MarkAsDone_ItemThatDoNotExist_ShouldReturnFalse()
    {
      // Arrange
      int id = int.MinValue;

      // Act
      bool marked = this.todoService.MarkAsDone(id);

      // Assert
      marked.ShouldBeFalse();
    }

    [Fact]
    internal void MarkAsDone_ItemThatExist_ShouldReturnTrue()
    {
      // Arrange
      todoService.Add("Test");
      var item = todoService.Get().LastOrDefault();

      // Act
      bool marked = this.todoService.MarkAsDone(item.Id);
      item = todoService.Get(item.Id);

      // Assert
      marked.ShouldBeTrue();
      item.ShouldNotBeNull();
      item.IsDone.ShouldBeTrue();
    }
  }
}

