# Kubernetes Micro-Services

The structured way to follow this repo is as follows:

1. `first-hands-on/`
2. `replica-sets/`
3. `deployments/`

## Pods

First things to note: Pods are not designed to be visible or accessible outside the cluster. They are isolated, and are only accessible inside the cluster itself.

## Services

Services, essentially, become a network endpoint for either other services or external users to connect to, like the browser.

Some types:

- `ClusterIp`: Service is only accessible only from inside the cluster, and not externally, like a browser. This is useful when you want to connect microservices so you can have a private network.

- `NodePort`: You expose a port through the node. You can choose ports greater than 30,000. Mostly used for development purposes.

## Replica Set

You dont usually deploy pods, but instead replica sets so than when a pod goes down, it can replicate that pod and get that pod up and running.

It's just like `AutoScaling` group policies you select on AWS. You select how many pods you want to have running at any one time.

## Deployments

Its essentially a way to mimic the `replica sets`. However, this allows you to do rolling deployments without having a downtime. Further, it allows you to rollback the previous replica set in case something goes wrong (as essentially, it deploys a new replica set, and the previous replica set is set to zero replicas, meaining that replica set can still be summoned).
