# mini-blog

A mini-microservices fullstack project briefly touching areas such as [CQRS](https://martinfowler.com/bliki/CQRS.html), [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html), N+1 selects problem etc, adapted from [this udemy course](https://www.udemy.com/course/microservices-with-node-js-and-react).

Trying to get to grips with the main issue that occurs when following Microservice Architecture principles - data management between services.

We've artificially separated the posts and comments service so that we can handle the issue of joining the data together via a 3rd service - in reality these are small enough to be in their own service and handled at the code level.

The moderation service could also be implemented very easily in the React app or existing comments service, but we've created it as a separate service to explore the difficulties that arise when building ontop of existing functionality with a new "simple feature".

Later on I'll do another project using Kafka or NATS, but for now just implementing a basic Event Bus in Express.
