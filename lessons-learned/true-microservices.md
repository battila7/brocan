# True Microservices

Inevitably, the most popular buzzword (apart from *deep learning*) in today's IT industry is the *microservice architecture*. Suddenly everyone started to develop their next product (or migrate the current ones) based on microservice architecture. However, if you look behind the curtain, you'll find that although everyone's hyped about it, everyone has a different understanding of what it is. To be honest, while I believe that this is the direction where software development should be heading at, at the same time this is not a "shoot for the moon land among the stars" journey, but something that's when did wrong is much worse than developing a monolith. Of course, I'm not trying to judge anyone here. I have little experience with microservices and with IT in overall. Also, I haven't taken the effort to read all the curriculum on microservices. I just want to paint with some broad strokes what I believe a microservice is. Whether you agree or not, is up to you.

In this article, I'm going to use two terms on every corner: 

  * *microservice architecture*, which refers to a software architecture that's driven by software components that can be referred to as microservices, and
  * the almighty term, *microservice* which is... uhm, something. 
  
Basically, I could even stop writing here because I've already made my point: there is no common definition of this term. Thus instead of coming up with an *nth* definition, I'm going to describe what I'd call a microservice. This description is not going to be by any means formal or strict, but something that can be used in everyday scenarios.

Based on my current level of understanding, the part in the word *microservice* we should put the emphasis on is *micro*. This perfectly describes the most important aspects of microservices in an informal way: 

  * small,
  * concentrated,
  * atomic.

*Small* is used here in the context of the number of lines that comprise the source code of the microservice. Concentrated refers to the responsibilities of such a unit: it should contain all the knowledge necessary to perform the task it's designed for. *Atomicity* is closely related to this concentrated nature of microservices. Basically, it means that each microservice should be concerned with one task or aspect. Of course, this should be taken with a grain of salt, since atomicity is greatly influenced by the granularity of tasks and aspects. Nevertheless, the idea is there.

Are these principles enough for developing good-enough microservices? Not at all. A single microservice is like what an ant is to a colony. Powerful on its own, but just a small piece that makes up the whole. Here the colony is the microservice architecture. Just to continue the analogy, in order to make up a functional colony, should an ant know what each of the others are doing? Of course, not! Microservices should have as little knowledge about each other as possible. In technical words, this means that they should be *loosely coupled*. 

Unfortunately, achieving loose coupling is easier said than done. What's the correct way? 
 
  * Manually configuring IP addresses of consumer microservices? Nah. 
  * Hiding different types of consumers behind load balancers/proxies/DNS? Still nah. 

What you're looking for is some kind of service discovery. This way, there's no need for manual configuration. You declare that you depend on some service A, and let the service discovery do its duty. Although this gets rid of the burden of manual configuration, microservices still have to know who the consumer of their output would be. Want to add a new microservice B that would consume the output of microservice A? Guess, you'll have to modify A to send stuff to B too. That sucks big time.

The Holy Grail of loose coupling is message passing. Microservices receive messages from basically unknown sources and send messages out to the wilderness in hope of someone's listening. This completely eliminates the coupling between the components of your architecture. Of course, direct connections to some components (such as the DB or a job queue) are still needed, but you get the idea. The communication between the microservices is done seldom through messages.

So, are we in Microservice-Nirvana yet? The sad answer is no. Even if you're applying the three principles of small, concentrated and atomic microservices and using message passing for inter-service communication, you can get quite a lot of stuff wrong. I believe, that the root cause is monolingualism. It's pretty easy to choose a decent framework (such as SenecaJS) and let that do the heavylifting. This approach pays off well in some scenarios but for larger scale systems, I don't think it's worth the tradeoff. Arguably this is somewhat the same as the Banana Monkey Jungle problem of OO languages. You wanted a decent-ish microservice system, but you got yourself framework- and language-locked.

Instead of concentratin your design around a specific framework, when designing a new software with a microservice-first approach in mind, you should take into account that a particular language might be well-suited for, let's say, 80% of the services, but the other 20% could be built in other languages. Just as the right tools amplify our talent (quoted from The Pragmatic Programmer), the right languages amplify our productiveness and by taking advantage of their strengths we can diminish the complexity introduced by a polyglot system.

At first sight, you might think that now we're in great trouble. For example, let's say that in order to increase the fault tolerance of your system, you decide to use a circuit breaker. Uh-oh! You cannot use the same circuit breaker library in your microservices, because some of them are written in Scala while others are written in CoffeeScript. Of course, you could use different libraries for each, but that would increase maintenance costs dramatically and would result in a slightly different behaviour across the components. Can you guess what the magic word is? Yes, you're right, loose coupling. We have to go down that road entirely.

Because we want microservices written in different languages, apart from the stuff they're directly responsible for, to be somewhat identical, we have to extract as many similar components and concerns as we possible. As soon as we are done with this, what we arrive at, is the essential, indivisible business logic. A microservice should not be concerned with message routing, circuit breaking, service discovery and so on. It should only do what it can do best: perform a single business task. That's it. In a true microservice architecture, microservices only contain business logic. Everything else is provided by the environment in a language-agnostic way. 

Just as always, this is not something that's easy (or even possible!) to achieve, but something that's worth to strive for. On one hand this results in increased environment complexity and decresed performance but on the other hand it enables high development speed and minimal coupling.
