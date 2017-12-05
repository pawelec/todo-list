using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using Shouldly;
using TodosApi.Controllers;
using Todos.Services;
using Xunit;
using Todos.Web.Models;

namespace Todos.Web.Tests
{
    public class TodosControllerTests
    {
        private readonly ITodosService todoService;

        public TodosControllerTests()
        {
            this.todoService = Substitute.For<ITodosService>();
        }

        [Fact]
        internal void GetAll_ExceptionOccured_ShouldReturnInternalServerError()
        {
            // Arrange
            todoService.Get().Throws(new Exception());
            var controller = new TodosController(todoService);

            // Act
            var result = controller.Get();

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
            var controller = new TodosController(todoService);

            // Act
            var result = controller.Get();
            var resultValue = (result as OkObjectResult)?.Value;
            // Assert
            result.ShouldNotBeNull();
            result.ShouldBeOfType<OkObjectResult>();
            resultValue.ShouldSatisfyAllConditions(
              () => resultValue.ShouldNotBeNull(),
              () => resultValue.ShouldBeOfType<List<TodoItem>>());
        }

        [Fact]
        internal void MarkAsDone_TodoDoNotExist_ShouldReturnNotFound()
        {
            // Arrange
            todoService.Get(Arg.Any<int>()).Returns((TodoItem)null);
            var controller = new TodosController(todoService);

            // Act
            var result = controller.MarkAsDone(0);

            // Assert
            result.ShouldNotBeNull();
            result.ShouldBeOfType<NotFoundResult>();
        }
        [Fact]
        internal void MarkAsDone_ExceptionOccured_ShouldReturnInternalServerError()
        {
            // Arrange
            todoService.Get(Arg.Any<int>()).Returns(new TodoItem());
            todoService.MarkAsDone(Arg.Any<int>()).Throws(new Exception());
            var controller = new TodosController(todoService);

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
            todoService.Get(Arg.Any<int>()).Returns(new TodoItem());
            todoService.MarkAsDone(Arg.Any<int>()).Returns(false);
            var controller = new TodosController(todoService);

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
            todoService.Get(Arg.Any<int>()).Returns(new TodoItem());
            todoService.MarkAsDone(Arg.Any<int>()).Returns(true);
            var controller = new TodosController(todoService);

            // Act
            var result = controller.MarkAsDone(0);

            // Assert
            result.ShouldNotBeNull();
            result.ShouldBeOfType<OkObjectResult>();
            (result as OkObjectResult).Value.ShouldBe(true);
        }

        [Fact]
        internal void Create_ObjectIsNull_ShouldReturnBadRequest()
        {
            // Arrange
            var controller = new TodosController(todoService);

            // Act
            var result = controller.Create(null) as BadRequestResult;

            // Assert
            result.ShouldNotBeNull();
            result.ShouldBeOfType<BadRequestResult>();
            result.StatusCode.ShouldBe(StatusCodes.Status400BadRequest);
        }
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData(" ")]
        internal void Create_ValueIsNullOrWhitespace_ShouldReturnBadRequest(
          string value)
        {
            // Arrange
            var controller = new TodosController(todoService);
            var model = new TodoForCreationDto { Value = value };
            // Act
            var result = controller.Create(model) as BadRequestResult;

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
            var controller = new TodosController(todoService);
            var model = new TodoForCreationDto { Value = "Test" };
            // Act
            var result = controller.Create(model);

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
            var controller = new TodosController(todoService);
            var model = new TodoForCreationDto { Value = "Test" };

            // Act
            var result = controller.Create(model);

            // Assert
            result.ShouldNotBeNull();
            result.ShouldBeOfType<StatusCodeResult>();
            (result as StatusCodeResult).StatusCode.ShouldBe(StatusCodes.Status500InternalServerError);
        }

        [Fact]
        internal void Create_ItemWasCreated_ShouldReturnCreatedResultWithContent()
        {
            // Arrange
            todoService.Add(Arg.Any<string>()).Returns(new TodoItem
            {
                Id = 1,
                Name = "test",
                IsDone = false
            });
            var controller = new TodosController(todoService);
            var model = new TodoForCreationDto { Value = "Test" };

            // Act
            var result = controller.Create(model) as CreatedResult;

            // Assert
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(StatusCodes.Status201Created);
            result.Value.ShouldNotBeNull();
        }
    }
}
