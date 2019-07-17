import Component from "./Component"
import Input from '../../Input/Input'

export default class Run extends Component
{
    name = 'run'
    
    constructor (gameObject)
    {
        super(gameObject)

        this.speed = 0
        this.break = 0

        this.maxVelocity = 10000
        this.distance = 0
    }

    update (dt)
    {
        this.setDirection()
        this.run(dt)
    }

    setDirection ()
    {
        //Just left
        if (Input.left && !Input.right) {
            this.gameObject.direction = -1
            this.gameObject.heading = -1
        }
        
        //Just right
        else if (Input.right && !Input.left) {
            this.gameObject.direction = 1
            this.gameObject.heading = 1
        }

        //Both or none
        else {
            this.gameObject.direction = 0
        }
    }

    run (dt)
    {
        if (this.gameObject.direction !== 0) {
            this.accelerate(dt)

            const directionSign = Math.sign(this.gameObject.direction)
            const velocitySign = Math.sign(this.gameObject.velocity.x)

            //When dashing
            if (directionSign !== velocitySign) {
                this.distance = 0
            }
        }

        else {
            this.decelerate(dt)            
        }
    }

    accelerate (dt)
    {
        const absoluteVelocityX = Math.abs(this.gameObject.velocity.x)

        if (absoluteVelocityX >= this.maxVelocity) {
            this.gameObject.acceleration.x = 0
            return
        }

        this.gameObject.acceleration.x = this.speed * this.gameObject.direction

        this.distance += absoluteVelocityX * dt
    }

    decelerate (dt)
    {
        this.gameObject.acceleration.x = 0
        
        const absoluteVelocityX = Math.abs(this.gameObject.velocity.x)

        //Evits the deceleration to turn around
        const deceleration = Math.min(absoluteVelocityX, this.break * dt)
        this.gameObject.velocity.x += (this.gameObject.velocity.x > 0) ? -deceleration : deceleration
    }
}