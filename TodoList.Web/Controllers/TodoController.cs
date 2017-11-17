using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TodoList.Services;
using System;

namespace TodoApi.Controllers
{
    public class TodoController : Controller
    {
        private readonly IToDoService todoService;

        public TodoController(IToDoService todoService)
        {
            this.todoService = todoService;
        }

        public IActionResult Get() => throw new NotImplementedException();

        public IActionResult Get(int itemId) => throw new NotImplementedException();
        public IActionResult Add(string name) => throw new NotImplementedException();
    }
}
