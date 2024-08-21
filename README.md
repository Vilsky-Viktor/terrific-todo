# Todo Backend and Frontend

TODO application contains functionality:
- View all the items
- Create item
- Delete item
- Update item (including status "done")

The repository contains two services:
- TODO server (backend)
- TODO application (frontend)

Each service has it's own README.md file

## How to run

In order to run both services you need docker and docker-compose installed on your machine.

```
cd path/to/projects/terrific-todo
docker-compose up -d
```

After all the services and dependencies are up navigate to:
http://localhost:3000

If you would like to send direct requests to backend:
http://localhost:5000/api/todo