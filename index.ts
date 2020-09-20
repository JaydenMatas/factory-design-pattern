/* (x) where x represents the bullet point in my notes 
*  Code and examples refactored from https://refactoring.guru/design-patterns/factory-method/typescript/example
*/

// (3)
// Creator
abstract class BaseCreator {

    public abstract createTransport(): ITransport;

    public someOperation(): string {
        // Call the factory method to create the transport object.
        const transport = this.createTransport();
        // Now, use the transport.
        return `Base Creator: The same creator's code has just worked with ${transport.operation()}`;

        // We can also do other business logic here
    }
}

// (4)
// Concrete Creators
class ConcreteCreatorLandTransport extends BaseCreator {
    type?: string;

    constructor(type?: string) {
        super();
        this.type = type;
    }

    // override the default and use a type to define
    public createTransport(): ITransport {
        switch (this.type) {
            case "Truck": {
                return new ConcreteTransportTruck();
            }
            case "Car": {
                return new ConcreteTransportCar();
            }
            default: return new ConcreteTransportTruck();
        }
    }
}

//(4)
class ConcreteCreatorSeaTransport extends BaseCreator {
    // original example without a type
    public createTransport(): ITransport {
        return new ConcreteTransportShip();
    }
}

// (1)
// Common interface
interface ITransport {
    operation(): string;
}

// (2)
// Concrete products that implement the common interface
class ConcreteTransportTruck implements ITransport {
    public operation(): string {
        return '{Result of the ConcreteTransportTruck}';
    }
}

// (2)
class ConcreteTransportCar implements ITransport {
    public operation(): string {
        return '{Result of the ConcreteTransportCar}';
    }
}

// (2)
class ConcreteTransportShip implements ITransport {
    public operation(): string {
        return '{Result of the ConcreteTransportShip}';
    }
}

// No matter how many conrete creators / products we make
// This client code does not need to change
// We can continue calling the factory "someOperation" method from the base class
function clientCode(factory: BaseCreator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(factory.someOperation());
    // ...
}

/**
 * The Application picks a creator's type depending on the configuration or
 * environment. This part can differ. 
 * Another basic example is using a switch statement to pick based on a type to return
 */
console.log('App: Launched with the ConcreteCreatorLandTransport with type truck');
clientCode(new ConcreteCreatorLandTransport("Truck"));
console.log('');

console.log('App: Launched with the ConcreteCreatorLandTransport with no valid type provided');
clientCode(new ConcreteCreatorLandTransport("this should default"));
console.log('');

console.log('App: Launched with the ConcreteCreatorLandTransport.');
clientCode(new ConcreteCreatorLandTransport("Car"));
console.log('');

console.log('App: Launched with the ConcreteCreatorSeaTransport.');
clientCode(new ConcreteCreatorSeaTransport());