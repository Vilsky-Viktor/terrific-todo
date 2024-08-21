# TODO backend

The service represents backend for TODO application written in NodeJS (Typescript) with REST API utilizing express framework. MongoDB is used as a persistent storage for TODOs. 

There are 5 main API routes:
- POST /api/todo with a payload
- GET /api/todo/:id (find one by ID)
- GET /api/todo (find all)
- PUT /api/todo/:id with a payload (updates an existing TODO item)
- DELETE /api/todo/:id (removes existing TODO item)

TODO model:
```
export interface ITodo extends Document {
    title: string;
    description?: string;
    done?: boolean;
}
```

Service structure has multiple layers:
- controllers (request handler)
- services (buisiness logic)
- dataAccess (communication with storage)

## How to run
In order to run backend locally you need docker and docker-compose to be installed on your machine.

```
cd path/to/projects/terrific-todo/todo-server
docker-compose up -d
```
Docker compose brings up the service along with mongodb instance. 
The service will be available on http://localhost:5000
MongoDB will be available on mongodb://localhost:27017/todos

## Kubernetes
There are 3 environments configured for k8s deployment: development, production, test.
Test environment is meant to run integration tests in incapsulated k8s namespace. 
Folder called kubernetes in the root of todo-server contains Kustomize yaml files with a base configuration and overlay for each environment.

## Testing and styling
Folder tests contains unit and integration tests.

running unit tests:
```
npm run unit-tests
npm run unit-tests:coverage
```

running linter:
```
npm run lint
npm run format
```

running integration tests:
```
docker compose up -d
docker logs -f todo-server-integration-tests-1
```
Or you can run docker compose and start the service test container seperately

## TODO
- More comprehensive integration tests
- More unit tests
- Improve error handling
- Adjust k8s configuration to real world needs (probably horisontal autoscaler)
- Implement pagination for TODOs
- Develop CI and CD