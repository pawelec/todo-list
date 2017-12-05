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
        public IActionResult Get()
        {
            try
            {
                var todos = this.todoService.Get();
                return this.Ok(todos);
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] TodoForCreationDto todo)
        {
            try
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
                return Created("", result);
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{todoId}")]
        public IActionResult MarkAsDone(int todoId)
        {
            try
            {
                if (this.todoService.Get(todoId).IsNull())
                {
                    return NotFound();
                }

                var result = this.todoService.MarkAsDone(todoId);
                return Ok(result);
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
