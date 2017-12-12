using System.Net;
using System.Threading.Tasks;
using Shouldly;
using Todos.Services;
using Xunit;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using Todos.Web.Models;

namespace Todos.Integrations.Tests
{
    [Collection("TestContextFixtureCollection")]
    public class TodosControllerTests
    {
        public readonly TestContext Context;

        public TodosControllerTests(TestContext context)
        {
            Context = context;
        }

        [Fact]
        internal async Task Get_ServiceWork_CollectionOfTodos()
        {
            // Act
            var response = await Context.Client.GetAsync("/api/todos");

            // Assert
            response.EnsureSuccessStatusCode();
            response.StatusCode.ShouldBe(HttpStatusCode.OK);
            var todos = await response.Content.ReadAsJsonAsync<IEnumerable<TodoItem>>();
            todos.ShouldNotBeNull();
            todos.ShouldBeOfType<List<TodoItem>>();
        }

        [Fact]
        internal async Task Create_TodosIsNull_BadRequest()
        {
            // Arrange
            TodoForCreationDto todoForCreation = null;

            // Act
            var response = await Context.Client.PostAsJsonAsync("/api/todos", todoForCreation);

            // Assert
            response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData(" ")]
        internal async Task Create_TodoValueIsNullOrWhitespace_BadRequest(string value)
        {
            // Arrange
            var todoForCreation = new TodoForCreationDto { Value = value };

            // Act
            var response = await Context.Client.PostAsJsonAsync("/api/todos", todoForCreation);

            // Assert
            response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        }
    }
}