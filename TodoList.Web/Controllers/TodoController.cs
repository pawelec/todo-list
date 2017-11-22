using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoList.Services;

namespace TodoApi.Controllers
{
  public class TodoController : Controller
  {
    private readonly IToDoService todoService;

    public TodoController(IToDoService todoService)
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
  }
}
