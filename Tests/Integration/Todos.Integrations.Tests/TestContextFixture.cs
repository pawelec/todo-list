using Xunit;

namespace Todos.Integrations.Tests
{
    [CollectionDefinition("TestContextFixtureCollection")]
    public class Collection : ICollectionFixture<TestContext>
    {

    }
}
