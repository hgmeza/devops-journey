# Networking with Pods

A simple demonstration on how they can network.

Run: `kubectl apply -f network-test.yml` which defines two servces: one a mysql pod, and another service pod.

Make sure you are running the files from `../deployments`

Steps:
- `kubectl get all -n kube-system` and remember the cluter ip from `service/kube-dns`
- `kubectl exec -it webapp-<rs-id>-<pod-id> -- sh`
- `cat /etc/resolv.conf`
- You will see that `nameserver` matches with the `service/kube-dns` cluster ip.
- `nslookup database` and this will give you the `database` ip we are currenly running. You can confirm by runnin `kubectl get all` and compare it with the cluster ip from `service/database`
- `apk update` (we are on an alpine image)
- `apk add mysql-client` (we want to demonstrate network connection to db)
- `mysql -h database -uroot -ppassword fleetman` and boom! connection established
- `create table testtable (test varchar(255));`
- `show tables;` and you will see the new table created from one pod to another!
