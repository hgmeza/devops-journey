# Kubernetes Micro-Services
## Pods

First things to note: Pods are not designed to be visible or accessible outside the cluster. They are isolated, and are only accessible inside the cluster itself.

## Services

Services, essentially, become a network endpoint for either other services or external users to connect to, like the browser.

Some types:

- `ClusterIp`: Service is only accessible only from inside the cluster, and not externally, like a browser. This is useful when you want to connect microservices so you can have a private network.

- `NodePort`: You expose a port through the node. You can choose ports greater than 30,000. Mostly used for development purposes.
