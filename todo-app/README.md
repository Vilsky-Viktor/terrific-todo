# Todo Frontend

The application represents UI for TODO service and utilises Angular 18 with Material Design. You will find 4 main folders under the app:
- core (backend service, todo model, pipe)
- shared (imports of all the shared components)
- todos (todo components: list, itme, edit dialog and delete dialog)
- header (application header)

There are 4 environments configured:
- local
- docker-compose
- development
- production

## How to run
In order to run application locally you need ng to be installed on your local machine.
Also backend should be running on localhost port 5100 (you can start it via docker-compose in todo-server folder)

```
cd path/to/projects/terrific-todo/todo-app
docker build --build-arg EVIRONMENT=local -t your-angular-app .
docker run -p 3100:3100 todo-app
```
Once the docker container is running the app will be available on http://localhost:3100

## Kubernetes
There are two environments configured for k8s deployment: development and production.
Folder called kubernetes in the root of todo-app contains Kustomize yaml files with a base configuration and overlay for each environment.

## TODO 
- Add application layers
- Testing via Playwright
- Adjusting k8s configuration to real world needs
- More professional angular and material design theming with Saas
- Implement pagination for TODOs
- Develop CI and CD
- Add linter




