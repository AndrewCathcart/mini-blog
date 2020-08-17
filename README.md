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

### Lessons learned

- The big challenge in microservices is data
- There's a lot of different approaches to sharing data between services. Probably best to focus on async communication, but it's a sliding scale between sync and async. Sync is a lot easier to implement, but it has many downsides in a production environment.
- Async communication focuses on communicating changes using _events_ sent to an _event bus_. Every service ends up being self sufficient, and we achieve a nice separation of concerns (e.g. a service goes down, no strict dependency between services so rest are unaffected and can replay event bus events to the downed service when it comes back online to recover).
- Docker & Kubernetes are a bit of a pain to setup, but make it very easy to deploy and scale.

### Pain points and solutions for future project

- Lots of duplicated code between microservices - we could build a central library as an NPM module to share code
- Really difficult to picture the flow of events between services - define all events in the above shared library
- Really difficult to remember what properties an event should have - use typescript
- Difficult to test some event flows - write automated tests for as much as possible
- All local development, Windows specific solutions etc for installing things - run a k8s cluster in the cloud and develop on it
- Is there a strange set of events that might break my program? Concurrency problems e.g. race conditions (What if i receive a comment before i receive the post the comment belongs to?) - introduce a lot of code to handle concurrency issues

### Useful docker / kubectl commands

```bash
docker build -t andrewcathcart/whatever .
docker push andrewcathcart/whatever
kubectl apply -f infra/k8s/whatever-depl.yaml (or kubectl apply -f [loc of depl scripts] to multi deploy)
kubectl get pods
kubectl get services
```

```bash
kubectl get deployments
kubectl rollout restart deployment [depl_name]
```

### Requirements

- [Docker](https://docs.docker.com/get-docker/)

- [Kubernetes](https://kubernetes.io/docs/setup/) - I just enabled it in the Docker for Windows application (Settings -> Kubernetes -> Enable Kubernetes -> Apply & Restart)

- [Skaffold](https://skaffold.dev/docs/install/) - This required me to install Chocolately as I was using Windows for dev

- [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/#docker-for-mac)

As I was just developing locally I had to change my hosts file for the client to be routed correctly. I appended the following line

```
127.0.0.1 posts.com
```

to C:\Windows\System32\drivers\etc - This wouldn't be needed if we deployed the front-end to prod.

### Running

Once all the requirements are installed you can then simply run `skaffold dev` from the root of this project to spin up all of the containers. Then navigate to posts.com in your browser.

If you make any local changes to the services in this project, Skaffold will rebuild the affected service using the workflow described in skaffold.yaml

- in this case just rebuilding our Docker container and redeploying it via the Kubernetes manifest files inside infra/k8s
