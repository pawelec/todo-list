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

        [Fact]
        internal async Task Create_CorrectValue_ReturnTodoItem()
        {
            // Arrange
            var todoForCreation = new TodoForCreationDto { Value = "Test" };
            var getReponse = await Context.Client.GetAsync("/api/todos");
            var todos = await getReponse.Content.ReadAsJsonAsync<IEnumerable<TodoItem>>() as IEnumerable<TodoItem>;
            int actualCount = todos.Count();
            int expectedCount = actualCount + 1;

            // Act
            var postReponse = await Context.Client.PostAsJsonAsync("/api/todos", todoForCreation);
            var newTodo = await postReponse.Content.ReadAsJsonAsync<TodoItem>() as TodoItem;

            getReponse = await Context.Client.GetAsync("/api/todos");
            todos = await getReponse.Content.ReadAsJsonAsync<IEnumerable<TodoItem>>() as IEnumerable<TodoItem>;
            actualCount = todos.Count();

            // Assert
            postReponse.EnsureSuccessStatusCode();
            postReponse.StatusCode.ShouldBe(HttpStatusCode.Created);
            newTodo.Name.ShouldBe(todoForCreation.Value);

            actualCount.ShouldBe(expectedCount);
        }

        [Fact]
        internal async Task MarkAsDone_ItemNotExist_NotFoundStatusCode()
        {
            // Act
            var putResponse = await Context.Client.PutAsync(
                "/api/todos/-1", new StringContent("-1"));

            // Assert
            putResponse.StatusCode.ShouldBe(HttpStatusCode.NotFound);
        }

        [Fact]
        internal async Task MarkAsDone_ItemExist_OkStatusCode()
        {
            // Arrange
            var todoForCreation = new TodoForCreationDto { Value = "Test" };
            var postReponse = await Context.Client.PostAsJsonAsync("/api/todos", todoForCreation);
            var newTodo = await postReponse.Content.ReadAsJsonAsync<TodoItem>() as TodoItem;

            // Act
            var putResponse = await Context.Client.PutAsync(
                $"/api/todos/{newTodo.Id}", new StringContent(newTodo.Id.ToString()));

            // Assert
            putResponse.StatusCode.ShouldBe(HttpStatusCode.OK);
        }
    }
}