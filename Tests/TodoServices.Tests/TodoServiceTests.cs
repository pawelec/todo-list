using Shouldly;
using System;
using TodoList.Services;
using Xunit;

namespace TodoServices.Tests
{
    public class TodoServiceTests
    {
        [Fact]
        internal void Add_NullAsName_ShouldThrowArgumentNullException()
        {
          // Arrange
          IToDoService service = new TodoService();
          string newItemName = null;

          // Act & Assert
          Action action = () => service.Add(newItemName);
          action.ShouldThrow<ArgumentNullException>();
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        internal void Add_NameIsEmptyOrWhitespace_ShouldThrowArgumentException(string newItemName)
        {
          // Arrange
          IToDoService service = new TodoService();

          // Act & Assert
          Action action = () => service.Add(newItemName);
          action.ShouldThrow<ArgumentException>();
        }
  }
}
