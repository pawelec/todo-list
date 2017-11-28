using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using Shouldly;
using TodoApi.Controllers;
using TodoList.Services;
using Xunit;

namespace Todos.Web.Tests
{
  public class TodosControllerTests
  {
    private readonly IToDoService todoService;

    public TodosControllerTests()
    {
      this.todoService = Substitute.For<IToDoService>();
    }

    [Fact]
    internal void GetAll_ExceptionOccured_ShouldReturnInternalServerError()
    {
      // Arrange
      todoService.Get().Throws(new Exception());
      var controller = new TodoController(todoService);

      // Act
      var result = controller.GetAll();

      // Assert
      result.ShouldNotBeNull();
      result.ShouldBeOfType<StatusCodeResult>();
      (result as StatusCodeResult).StatusCode.ShouldBe(StatusCodes.Status500InternalServerError);
    }

    [Fact]
    internal void GetAll_ShouldReturnOkWithCollectionOfTodoItems()
    {
      // Arrange
      todoService.Get().Returns(new List<TodoItem>());
      var controller = new TodoController(todoService);

      // Act
      var result = controller.GetAll();
      var resultValue = (result as OkObjectResult)?.Value;
      // Assert
      result.ShouldNotBeNull();
      result.ShouldBeOfType<OkObjectResult>();
      resultValue.ShouldSatisfyAllConditions(
        () => resultValue.ShouldNotBeNull(),
        () => resultValue.ShouldBeOfType<List<TodoItem>>());
    }

    [Fact]
    internal void MarkAsDone_ExceptionOccured_ShouldReturnInternalServerError()
    {
      // Arrange
      todoService.MarkAsDone(Arg.Any<int>()).Throws(new Exception());
      var controller = new TodoController(todoService);

      // Act
      var result = controller.MarkAsDone(0);

      // Assert
      result.ShouldNotBeNull();
      result.ShouldBeOfType<StatusCodeResult>();
      (result as StatusCodeResult).StatusCode.ShouldBe(StatusCodes.Status500InternalServerError);
    }

    [Fact]
    internal void MarkAsDone_ItemDontExist_ShouldReturnOkWithFalse()
    {
      // Arrange
      todoService.MarkAsDone(Arg.Any<int>()).Returns(false);
      var controller = new TodoController(todoService);

      // Act
      var result = controller.MarkAsDone(0);

      // Assert
      result.ShouldNotBeNull();
      result.ShouldBeOfType<OkObjectResult>();
      (result as OkObjectResult).Value.ShouldBe(false);
    }
    [Fact]
    internal void MarkAsDone_ItemExist_ShouldReturnOkWithTrue()
    {
      // Arrange
      todoService.MarkAsDone(Arg.Any<int>()).Returns(true);
      var controller = new TodoController(todoService);

      // Act
      var result = controller.MarkAsDone(0);

      // Assert
      result.ShouldNotBeNull();
      result.ShouldBeOfType<OkObjectResult>();
      (result as OkObjectResult).Value.ShouldBe(true);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData(" ")]
    internal void Create_ValueIsNullOrWhitespace_ShouldReturnBadRequest(
      string value)
    {
      // Arrange
      var controller = new TodoController(todoService);

      // Act
      var result = controller.Create(value) as BadRequestResult;

      // Assert
      result.ShouldNotBeNull();
      result.ShouldBeOfType<BadRequestResult>();
      result.StatusCode.ShouldBe(StatusCodes.Status400BadRequest);
    }

    [Fact]
    internal void Create_ExceptionOccured_ShouldReturnInternalServerError()
    {
      // Arrange
      todoService.Add(Arg.Any<string>()).Throws(new Exception());
      var controller = new TodoController(todoService);

      // Act
      var result = controller.Create("test");

      // Assert
      result.ShouldNotBeNull();
      result.ShouldBeOfType<StatusCodeResult>();
      (result as StatusCodeResult).StatusCode.ShouldBe(StatusCodes.Status500InternalServerError);
    }

    [Fact]
    internal void Create_ItemNotCreated_ShouldReturnEmptyResult()
    {
      // Arrange
      todoService.Add(Arg.Any<string>()).Returns((TodoItem)null);
      var controller = new TodoController(todoService);

      // Act
      var result = controller.Create("test") as NoContentResult;

      // Assert
      result.ShouldNotBeNull();
      result.ShouldBeOfType<NoContentResult>();
      result.StatusCode.ShouldBe(StatusCodes.Status204NoContent);
    }

    [Fact]
    internal void Create_ItemWasCreated_ShouldReturnCreatedResultWithContent()
    {
      // Arrange
      todoService.Add(Arg.Any<string>()).Returns(new TodoItem
      {
        Id = 1, Name = "test", IsDone = false
      });
      var controller = new TodoController(todoService);

      // Act
      var result = controller.Create("test") as CreatedResult;

      // Assert
      result.ShouldNotBeNull();
      result.StatusCode.ShouldBe(StatusCodes.Status201Created);
      result.Value.ShouldNotBeNull();
    }
  }
}
