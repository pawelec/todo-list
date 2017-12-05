using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Todos.Services;
using Todos.Common;
using Todos.Web.Models;

namespace TodosApi.Controllers
{
    [Route("api/todos")]
    public class TodosController : Controller
    {
        private readonly ITodosService todoService;

        public TodosController(ITodosService todoService)
        {
            this.todoService = todoService;
        }

        [HttpGet]
        public IActionResult GetTodos()
        {
            var todos = this.todoService.Get();
            return this.Ok(todos);
        }

        [HttpPost]
        public IActionResult Create([FromBody] TodoForCreationDto todo)
        {
            if (todo.IsNull() || string.IsNullOrWhiteSpace(todo.Value))
            {
                return BadRequest();
            }

            var result = this.todoService.Add(todo.Value);
            if (result.IsNull())
            {
                throw new Exception("Creating an author failed on save.");
            }
            return Created("", todo);
        }

        [HttpPut("{todoId}")]
        public IActionResult MarkAsDone(int todoId)
        {
            if (this.todoService.Get(todoId).IsNull())
            {
                return NotFound();
            }

            var result = this.todoService.MarkAsDone(todoId);
            return Ok(result);
        }
    }
}
