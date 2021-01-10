# Deployments

An elegant way to do rolling deployments without having downtime on the services. The structure of the `yml` file is the same.

NOTE:
You may see that a new deployment configuration was added:
`minReadySeconds: 30`
That defaults to zero if not added. The purpose of adding this is to see the deployment in action (you can refresh the page often to see the new changes on browser).

To see this in action, make sure that you first apply the files, but use `richardchesterwood/k8s-fleetman-webapp-angular:release0` image. Once everything is running, go to browser, and access the port `<minikube-ip:30080>`.

Then, change again to the original image of `richardchesterwood/k8s-fleetman-webapp-angular:release0-5`. Keep on refreshing the page, and boom, new app deployed!

Checking the deployment status: 
- `kubectl rollout status deployment webapp`

Rollback:
- `kubectl rollout undo deployment webapp`
By default, it will undo to the previous version, and k8s will remember the last 10 revisions of a rollout.

NOTE:
Rollback must be used only on emergencies. Using the rollback will drift; meaning, that `yml` file will NOT match your current deployed version.
