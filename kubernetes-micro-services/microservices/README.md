# Microservice Arquitecture with AWS
## Scenario
Since this is more Ops related, lets pretend that the development team has done all the app coding, and that they pushed the Docker Image for us to deploy.

Data given from developers:
- `queue` microservice is accessible on port: `8161`
- `position-simulator` microservice has no access port
- `position-tracker` microservice is accessible on port: `8080`
- - REST URI is in the form `/GET /vehicles/{vehicle name}` (note the blank space)
