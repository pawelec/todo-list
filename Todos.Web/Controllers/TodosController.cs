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
    public IActionResult GetAll()
    {
      try
      {
        return new OkObjectResult(this.todoService.Get());
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateTodoItemObjectModel model)
    {
      if (model.IsNull() || string.IsNullOrWhiteSpace(model.Value))
      {
        return BadRequest();
      }
      try
      {
        var result = this.todoService.Add(model.Value);
        if (result.IsNull())
        {
          return NoContent();
        }
        return Created("", model);
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    [HttpPut("{itemId}")]
    public IActionResult MarkAsDone(int itemId)
    {
      try
      {
        return Ok(this.todoService.MarkAsDone(itemId));
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }
  }
}
