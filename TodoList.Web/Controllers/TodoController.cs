using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Todos.Services;
using Todos.Common;

namespace TodoApi.Controllers
{
  public class TodoController : Controller
  {
    private readonly ITodosService todoService;

    public TodoController(ITodosService todoService)
    {
      this.todoService = todoService;
    }

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

    public IActionResult Create(string value)
    {
      if (string.IsNullOrWhiteSpace(value))
      {
        return BadRequest();
      }
      try
      {
        var result = this.todoService.Add(value);
        if (result.IsNull())
        {
          return NoContent();
        }
        return Created("", value);
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
      
    }
  }
}
