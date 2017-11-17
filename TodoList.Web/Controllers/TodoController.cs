using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TodoList.Services;

namespace TodoApi.Controllers
{
    [Route("api/todo")]
    public class TodoController : Controller
    {
        private readonly IToDoService todoService;

        public TodoController(IToDoService todoService)
        {
            this.todoService = todoService;
        }
    }
}
