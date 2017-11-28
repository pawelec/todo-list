using System;
using Xunit;
using TodoList.Common;
using Shouldly;

namespace Todos.Common.Tests
{
  public class ObjectsExtensionsTests
  {
    [Theory]
    [InlineData(null, true)]
    [InlineData(default(string), true)]
    [InlineData(default(Object), true)]
    [InlineData("", false)]
    [InlineData("Not null string", false)]
    internal void IsNull_ReferencesObjects_ShouldReturnExceptedValue(
      object obj, bool excepted)
    {
      bool isNull = obj.IsNull();
      isNull.ShouldBe(excepted);
    }

    [Theory]
    [InlineData(default(int), false)]
    [InlineData(1, false)]
    [InlineData(true, false)]
    internal void IsNull_ValueTypeObjects_ShouldReturnExceptedValue(
          object obj, bool excepted)
    {
      bool isNull = obj.IsNull();
      isNull.ShouldBe(excepted);
    }

    [Fact]
    internal void IsNull_NullableIntWithNull_ShouldReturnTrue()
    {
      Nullable<int> obj = null;
      bool isNull = obj.IsNull();
      isNull.ShouldBe(true);
    }

    [Fact]
    internal void IsNull_NullableIntWithValue_ShouldReturnTrue()
    {
      Nullable<int> obj = 5;
      bool isNull = obj.IsNull();
      isNull.ShouldBe(false);
    }
  }
}
