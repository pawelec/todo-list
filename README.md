![Alt text](/../assets/header.png?raw=true "Project header")

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To clone, run and test this application, you'll need `Git`, `Node.js` (which comes with `npm`), `angular-cli` and `dotnet core` installed on your computer.

### Installing

From your command line:
```
# Clone this repository
$ git clone https://github.com/pawelec/todos

# Go into the repository
$ cd todos

# Restore & rebuild solution
$ dotnet build

# Install dependencies
$ cd Todos.Web
$ npm install

# Build client side app
$ ng build

# Run the app
$ dotnet run
```

### Tests

Type `dotnet test` inside `todos` folder to run backend tests.
Type `ng test` inside `Todos.Web` folder to run frontend tests.

## License

This project is licensed under the MIT License - see the [license](LICENSE.md) file for details