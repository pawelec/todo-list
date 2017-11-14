using System;
using Xunit;
using TodoList.Common;
using Shouldly;

namespace TodoCommon.Tests
{
    public class ObjectsExtensionsTests
    {
        [Theory]
        [InlineData(null, true)]
        [InlineData(default(string), true)]
        internal void IsNull_ReferencesObjects_ShouldReturnExceptedValue(
          object obj, bool excepted)
        {
          bool isNull = obj.IsNull();
          isNull.ShouldBe(excepted);
        }
    }
}
