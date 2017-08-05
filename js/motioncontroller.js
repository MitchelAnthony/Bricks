//export { MotionController }

var MotionController = {

    __worldDirection: new THREE.Vector3(),
    __orthogonalVector: new THREE.Vector3(),
    yAxisUnitVector: new THREE.Vector3(0, 1, 0),
    q: new THREE.Quaternion(),
    controlledObject: null,

    // TODO: Add default arguments to allow different step sizes

    /*
     * Set the object to be controlled by this MotionController
     */
    setControlledObject(cObj) {
        this.controlledObject = cObj;
    },

    /*
     * Longitudinal movement
     */
    moveForward() {
        this.controlledObject.position.add(this.worldDirection);
    },

    moveBackward() {
        // Negate for backwards movement
        this.controlledObject.position.add(this.worldDirection.negate());
    },

    /*
     * Lateral movement
     */
    moveLeft() {
        // Negate for leftwards movement
        this.controlledObject.position.add(this.orthogonalVector.negate());
    },

    moveRight() {
        this.controlledObject.position.add(this.orthogonalVector);
    },

    /*
     * Vertical rotation (yaw)
     */
    lookLeft() {
        // Define a counter clockwise rotation around the y-axis
        this.q.setFromEuler(new THREE.Euler(0, 0.05 * Math.PI, 0));
        this.controlledObject.applyQuaternion(this.q);
    },

    lookRight() {
        // Define a clockwise (negative radians) rotation around the y-axis
        this.q.setFromEuler(new THREE.Euler(0, -0.05 * Math.PI, 0));
        this.controlledObject.applyQuaternion(this.q);
    },

    /*
     * Lateral rotation (pitch)
     */
    lookUp() {
        // Define a counter clockwise rotation around the axis orthogonal to the world direction and y-axis
        this.q.setFromAxisAngle(this.orthogonalVector, 0.05 * Math.PI);
        this.controlledObject.applyQuaternion(this.q);
    },

    lookDown() {
        // Define a clockwise (negative radians) rotation around the axis orthogonal to the world direction and y-axis
        this.q.setFromAxisAngle(this.orthogonalVector, -0.05 * Math.PI);
        this.controlledObject.applyQuaternion(this.q);
    },

    /*
     * Helper methods
     */
     get worldDirection() {
         // Update and return the world direction
         this.controlledObject.getWorldDirection(this.__worldDirection);
         return this.__worldDirection;
     },

     get orthogonalVector() {
         // Update and return the vector orthogonal to both the world direction and the y-axis
         this.__orthogonalVector = this.__orthogonalVector.crossVectors(this.worldDirection, this.yAxisUnitVector);
         return this.__orthogonalVector;
     }
}
