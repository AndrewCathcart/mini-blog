# mini-blog

A mini-microservices fullstack project adapted from [this udemy course](https://www.udemy.com/course/microservices-with-node-js-and-react) briefly touching areas such as

- [CQRS](https://martinfowler.com/bliki/CQRS.html)
- [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)
- N+1 selects problem etc
- Docker & Kubernetes

Trying to get to grips with the main issue that occurs when following Microservice Architecture principles - data management between services.

We've artificially separated the posts and comments service so that we can handle the issue of joining the data together via a 3rd service - in reality these are small enough to be in their own service and handled at the code level.

The moderation service could also be implemented very easily in the React app or existing comments service, but we've created it as a separate service to explore the difficulties that arise when building ontop of existing functionality with a new "simple feature".

This is a super simple project, later on I'll do another project using Kafka or NATS, but for now just implementing a basic Event Bus in Express to solidify a base understanding of the underlying technologies.

### Useful docker / kubectl commands

```bash
docker build -t andrewcathcart/whatever .
docker push andrewcathcart/whatever
kubectl apply -f infra/k8s/whatever-depl.yaml
kubectl get pods
kubectl get services
```

```bash
kubectl get deployments
kubectl rollout restart deployment [depl_name]
```
