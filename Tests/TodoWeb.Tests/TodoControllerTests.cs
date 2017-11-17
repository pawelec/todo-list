using System;
using Xunit;
using TodoApi.Controllers;
using System.Threading.Tasks;
using TodoList.Services;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace TodoWeb.Tests
{
    public class TodoControllerTests
    {
        [Fact]
        internal void Get_All_ReturnOkContentResultWithTodoItems()
        {
            // Arrange
            var controller = new TodoController(
                    Substitute.For<IToDoService>());

            // Act
            var result = controller.Get();

            // Assert
            result.ShouldBeOfType(typeof(OkObjectResult));
            result.ShouldNotBeNull();
            (result as OkObjectResult).Value.ShouldBeOfType(typeof(IEnumerable<TodoItem>));
        }

        [Fact]
        internal void GetById_WhenItemDoNotExist_ShouldReturnOkWithNull()
        {
            // Arrange
            var todoService = Substitute.For<IToDoService>();
            todoService.Get().ReturnsForAnyArgs(item => null);

            var controller = new TodoController(todoService);

            // Act
            var result = controller.Get();
            var resultData = (result as OkObjectResult)?.Value;

            // Assert
            result.ShouldBeOfType(typeof(OkObjectResult));
            result.ShouldNotBeNull();
            resultData.ShouldBeOfType(typeof(TodoItem));
            resultData.ShouldBeNull();
        }

        [Fact]
        internal void GetById_WhenItemExist_ShouldReturnOkWithItem()
        {
            // Arrange
            var todoService = Substitute.For<IToDoService>();
            var item = new TodoItem {
                Id = Int32.MaxValue
            };

            todoService.Get(Arg.Any<int>()).Returns(item);

            var controller = new TodoController(todoService);

            // Act
            var result = controller.Get();
            var resultData = (result as OkObjectResult)?.Value;

            // Assert
            result.ShouldBeOfType(typeof(OkObjectResult));
            result.ShouldNotBeNull();
            resultData.ShouldNotBeNull();
            resultData.ShouldBeOfType(typeof(TodoItem));
            (resultData as TodoItem).Id.ShouldBe(item.Id);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData(" ")]
        public void Create_WhenNameIsNullOrWhiteSpace_ShouldReturnOkWithNull(
            string newItemName
        ) {
            // Arrange
            var todoService = Substitute.For<IToDoService>();
            todoService.Add(
                Arg.Is<string>(name => name == null || name == "" || name == " "))
                .Returns(item => null);

            var controller = new TodoController(todoService);

            // Act
            var result = controller.Add(newItemName);
            var resultData = (result as OkObjectResult)?.Value;

            // Assert
            result.ShouldBeOfType(typeof(OkObjectResult));
            result.ShouldNotBeNull();
            resultData.ShouldBeOfType(typeof(TodoItem));
            resultData.ShouldBeNull();
        }
    }
}
