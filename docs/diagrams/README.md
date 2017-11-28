# Diagrams

In the subfolders of this folder, various diagrams can be found for different parts of Brocan. Most of these were created using [draw.io](http://draw.io).

## [Build System](build-system)

Shows all components of the Brocan Build System (except for stuff like Kibana, NATS and such) and the connections between them. 

## [Build Request Process](build-request-process)

Displays the components that take part in the build request process separated into the four layers as described in [Service-Oriented Architecture: Analysis and Design for Services and Microservices](https://www.amazon.com/Service-Oriented-Architecture-Analysis-Microservices-Technology/dp/0133858588). 

## [Build Execution Process](build-execution-process)

Components that take part in the build execution process separated into the four layers as described in [Service-Oriented Architecture: Analysis and Design for Services and Microservices](https://www.amazon.com/Service-Oriented-Architecture-Analysis-Microservices-Technology/dp/0133858588).

## [Build Data Query Process](build-data-query-process)

Displays the components that take part in the build data query process separated into the four layers described in [Service-Oriented Architecture: Analysis and Design for Services and Microservices](https://www.amazon.com/Service-Oriented-Architecture-Analysis-Microservices-Technology/dp/0133858588). Although this is not strictly a single process, because logs, repository and build execution data can be queried separately, it makes sense to group them into a single *query* process.
