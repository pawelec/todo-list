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

namespace TodoWeb.Tests
{
  public class TodoControllerTests
  {
    private readonly IToDoService todoService;

    public TodoControllerTests()
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
  }
}
