/* (x) where x represents the bullet point in my notes 
*  Code and examples refactored from https://refactoring.guru/design-patterns/factory-method/typescript/example
*/

// (3)
// Creatord
abstract class BaseCreator {

    public abstract createTransport(): ITransport;

    public someOperation(): string {
        // Call the factory method to create the transport object.
        const transport = this.createTransport();
        // Now, use the transport.
        return `Base Creator: The same creator's code has just worked with ${transport.operation()}`;
    }
}

// (4)
// Concrete Creators
class ConcreteCreator1 extends BaseCreator {
    public createTransport(): ITransport {
        return new ConcreteTransport1();
    }
}

//(4)
class ConcreteCreator2 extends BaseCreator {
    public createTransport(): ITransport {
        return new ConcreteTransport2();
    }
}

// (1)
// Common interface
interface ITransport {
    operation(): string;
}

// (2)
// Concrete products that implement the common interface
class ConcreteTransport1 implements ITransport {
    public operation(): string {
        return '{Result of the ConcreteTransport1}';
    }
}

// (2)
class ConcreteTransport2 implements ITransport {
    public operation(): string {
        return '{Result of the ConcreteTransport2}';
    }
}

function clientCode(creator: BaseCreator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
}

/**
 * The Application picks a creator's type depending on the configuration or
 * environment. This part can differ. 
 * Another basic example is using a switch statement to pick based on a type to return
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());